import { Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir } from 'fs/promises';
import path from 'path';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WORKOUT_BACKGROUNDS_FOLDER } from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
  private host: string;
  private port: number;
  private uploadFolder: string;
  private staticFolder: string;

  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private readonly config: ConfigService
  ) {
    this.host = config.get<string>('app.host');
    this.port = config.get<number>('app.port');
    this.uploadFolder = config.get<string>('multer.storage');
    this.staticFolder = config.get<string>('static.folder');
  }

  async create(
    dto: CreateWorkoutDto,
    file: Express.Multer.File,
    userId: number
  ): Promise<Workout> {
    const video = this.setVideoHref(file);
    const backgroundImage = await this.setBackgroundImage();
    const workoutEntity = new WorkoutEntity({
      ...dto,
      trainer: userId,
      video,
      backgroundImage,
    });
    return this.workoutRepository.create(workoutEntity);
  }

  private setVideoHref(file: Express.Multer.File): string {
    return new URL(
      `http://${this.host}:${this.port}/${this.uploadFolder}/${file.fieldname}/${file.filename}`
    ).href;
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
