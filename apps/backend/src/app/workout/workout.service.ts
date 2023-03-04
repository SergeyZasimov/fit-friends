import { Workout, WorkoutQuery } from '@fit-friends/shared';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir } from 'fs/promises';
import path from 'path';
import { ServiceWithFiles } from '../abstract/service-with-files';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import {
  WORKOUT_BACKGROUNDS_FOLDER,
  WorkoutExceptionMessage,
} from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService extends ServiceWithFiles {
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly configService: ConfigService
  ) {
    super(configService);
  }

  async getOne(id: number): Promise<Workout> {
    return this.workoutRepository.findOne(id);
  }

  async getMany(query: WorkoutQuery, userId: number): Promise<Workout[]> {
    return this.workoutRepository.findMany(query, userId);
  }

  async create(
    dto: CreateWorkoutDto,
    userId: number,
    file?: Express.Multer.File
  ): Promise<Workout> {
    const video = file && this.setFilename(file);
    const backgroundImage = await this.setBackgroundImage();
    const workoutEntity = new WorkoutEntity({
      ...dto,
      trainer: userId,
      video: video && this.setFileUrl(video),
      backgroundImage,
    });
    const newWorkout = await this.workoutRepository.create(workoutEntity);

    await this.writeUserFile(video);

    return newWorkout;
  }

  async update(
    id: number,
    dto: UpdateWorkoutDto,
    file: Express.Multer.File,
    userId: number
  ): Promise<Workout> {
    const existWorkout = await this.checkWorkoutExist(id);

    if (existWorkout.trainerId !== userId) {
      throw new ForbiddenException(WorkoutExceptionMessage.ForeignWorkout);
    }

    const currentVideo = existWorkout.video;

    const video = file && this.setFilename(file);
    const updatedWorkout = new WorkoutEntity({
      ...existWorkout,
      ...dto,
      trainer: existWorkout.trainerId,
      video: video && this.setFileUrl(video),
    });
    const updatedWokrout = this.workoutRepository.update(id, updatedWorkout);

    if (video) {
      await this.deleteUserFile(currentVideo);
      await this.writeUserFile(video);
    }

    return updatedWokrout;
  }

  async checkWorkoutExist(id: number): Promise<Workout> {
    const existWorkout = await this.workoutRepository.findOne(id);
    if (!existWorkout) {
      throw new NotFoundException(WorkoutExceptionMessage.NotFound);
    }
    return existWorkout;
  }

  private async setBackgroundImage(): Promise<string> {
    const backgrounds = await readdir(
      path.resolve(this.staticFolder, WORKOUT_BACKGROUNDS_FOLDER)
    );
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const backgroundImage = backgrounds[randomIndex];
    return new URL(
      `http://${this.host}:${this.port}/${WORKOUT_BACKGROUNDS_FOLDER}/${backgroundImage}`
    ).href;
  }
}
