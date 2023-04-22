import { WorkoutDiary } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { CreateWorkoutDiaryDto } from './dto/create-workout-diary.dto';
import { WorkoutDiaryEntity } from './workout-diary.entity';
import { WorkoutDiaryRepository } from './workout-diary.repository';
import { QueryDiaryDto } from '../query/diary-query.dto';

@Injectable()
export class WorkoutDiaryService {
  constructor(
    private readonly workoutDiaryRepository: WorkoutDiaryRepository,
    private readonly workoutService: WorkoutService
  ) {}

  async create(
    userId: number,
    dto: CreateWorkoutDiaryDto
  ): Promise<WorkoutDiary> {
    await this.workoutService.checkWorkoutExist(dto.workoutId);

    const workoutDiaryEntity = new WorkoutDiaryEntity({ ...dto, userId });
    return this.workoutDiaryRepository.create(workoutDiaryEntity);
  }

  async getMany(userId: number, query: QueryDiaryDto): Promise<WorkoutDiary[]> {
    return this.workoutDiaryRepository.findMany(userId, query);
  }
}
