import { Workout } from '@fit-friends/shared';

export class WorkoutEntity implements Workout {
  title: string;
  backgroundImage: string;
  customerLevel: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesAmountToLose: number;
  description: string;
  favorGender: string;
  video: string;
  rating: number;
  trainer: number;
  isSpecial: boolean;

  constructor(workout: Workout) {
    this.title = workout.title;
    this.backgroundImage = workout.backgroundImage;
    this.customerLevel = workout.customerLevel;
    this.trainingType = workout.trainingType;
    this.trainingTime = workout.trainingTime;
    this.price = workout.price ?? 0;
    this.caloriesAmountToLose = workout.caloriesAmountToLose;
    this.description = workout.description;
    this.favorGender = workout.favorGender;
    this.video = workout.video ?? '';
    this.rating = workout.rating ?? 0;
    this.trainer = workout.trainer as number;
    this.isSpecial = workout.isSpecial ?? false;
  }
}
