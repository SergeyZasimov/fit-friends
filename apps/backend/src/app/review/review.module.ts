import { Module } from '@nestjs/common';
import { WorkoutModule } from '../workout/workout.module';
import { ReviewController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  imports: [WorkoutModule],
  providers: [ReviewService, ReviewRepository],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
