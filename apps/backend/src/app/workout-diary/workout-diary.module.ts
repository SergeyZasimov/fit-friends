import { Module } from '@nestjs/common';
import { WorkoutModule } from '../workout/workout.module';
import { WorkoutDiaryController } from './workout-diary.controller';
import { WorkoutDiaryRepository } from './workout-diary.repository';
import { WorkoutDiaryService } from './workout-diary.service';

@Module({
  imports: [WorkoutModule],
  providers: [WorkoutDiaryService, WorkoutDiaryRepository],
  controllers: [WorkoutDiaryController],
})
export class WorkoutDiaryModule {}
