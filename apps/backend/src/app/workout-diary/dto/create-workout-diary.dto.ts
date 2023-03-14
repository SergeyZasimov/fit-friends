import { CreateWorkoutDiary } from '@fit-friends/shared';
import { IsInt } from 'class-validator';

export class CreateWorkoutDiaryDto implements CreateWorkoutDiary {
  @IsInt()
  workoutId: number;

  @IsInt()
  lostCaloriesAmount: number;

  @IsInt()
  lostTrainingTime: number;
}
