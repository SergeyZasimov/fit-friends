import { CreateWorkoutDiary, TrainingTimes } from '@fit-friends/shared';
import { IsEnum, IsInt } from 'class-validator';
import { WorkoutDiaryValidationMessage } from '../workout-diary.constant';

const {
  LostCaloriesAmountNotValid,
  LostTrainingTimeNotValid,
  WorkoutIdNotValid,
} = WorkoutDiaryValidationMessage;

export class CreateWorkoutDiaryDto implements CreateWorkoutDiary {
  @IsInt({ message: WorkoutIdNotValid })
  workoutId: number;

  @IsInt({ message: LostCaloriesAmountNotValid })
  lostCaloriesAmount: number;

  @IsEnum(TrainingTimes, { message: LostTrainingTimeNotValid })
  lostTrainingTime: string;
}
