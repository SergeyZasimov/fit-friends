import { CreateReview } from '@fit-friends/shared';
import { IsInt, Length, Max, Min } from 'class-validator';
import { REVIEW_CONSTRAINT, ReviewValidationMessage } from '../review.constant';

const { RatingNotValid, TextLengthNotValid, WorkoutIdNotValid } =
  ReviewValidationMessage;

export class CreateReviewDto implements CreateReview {
  @IsInt({ message: WorkoutIdNotValid })
  workoutId: number;

  @Max(REVIEW_CONSTRAINT.RATING.MAX, { message: RatingNotValid })
  @Min(REVIEW_CONSTRAINT.RATING.MIN, { message: RatingNotValid })
  rating: number;

  @Length(REVIEW_CONSTRAINT.TEXT.MIN, REVIEW_CONSTRAINT.TEXT.MAX, {
    message: TextLengthNotValid,
  })
  text: string;
}
