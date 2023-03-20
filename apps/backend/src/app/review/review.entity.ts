import { Review } from '@fit-friends/shared';

export class ReviewEntity implements Review {
  userId?: number;
  workoutId?: number;
  rating: number;
  text: string;

  constructor(entity: Review) {
    this.userId = entity.userId;
    this.workoutId = entity.workoutId;
    this.rating = entity.rating;
    this.text = entity.text;
  }
}
