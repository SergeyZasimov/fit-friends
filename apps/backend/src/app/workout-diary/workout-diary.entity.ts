import { WorkoutDiary } from '@fit-friends/shared';

export class WorkoutDiaryEntity implements WorkoutDiary {
  userId: number;
  workoutId: number;
  lostCaloriesAmount: number;
  lostTrainingTime: string;

  constructor(entity: WorkoutDiary) {
    this.userId = entity.userId;
    this.workoutId = entity.workoutId;
    this.lostCaloriesAmount = entity.lostCaloriesAmount;
    this.lostTrainingTime = entity.lostTrainingTime;
  }
}
