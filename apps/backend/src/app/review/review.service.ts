import { Review } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly workoutService: WorkoutService
  ) {}

  async create(data: CreateReviewDto, userId: number): Promise<Review> {
    await this.workoutService.checkWorkoutExist(data.workoutId);
    const reviewEntity = new ReviewEntity({ ...data, userId });
    const newReview = await this.reviewRepository.create(reviewEntity);
    const rating = await this.reviewRepository.getRating(newReview.workoutId);
    await this.workoutService.updateRating(newReview.workoutId, rating);
    return this.reviewRepository.findOne(newReview.id);
  }

  async getMany(workoutId: number): Promise<Review[]> {
    await this.workoutService.checkWorkoutExist(workoutId);
    return this.reviewRepository.findMany(workoutId);
  }
}
