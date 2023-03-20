import { faker } from '@faker-js/faker';
import { Workout } from '@fit-friends/shared';
import { CreateReviewDto } from '../../review/dto/create-review.dto';
import { REVIEW_CONSTRAINT } from '../../review/review.constant';

export const createReview = (workout: Workout): CreateReviewDto => ({
  workoutId: workout.id,
  rating: faker.datatype.number({
    min: REVIEW_CONSTRAINT.RATING.MIN,
    max: REVIEW_CONSTRAINT.RATING.MAX,
  }),
  text: faker.lorem.sentences(),
});
