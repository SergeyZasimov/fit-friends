import {
  TrainingTimes,
  TrainingTypes,
  WorkoutQuery,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';
import {
  WORKOUT_CONSTRAINT,
  WorkoutValidationMessage,
} from '../workout.constant';

const {
  PriceNotValid,
  CaloriesAmountNotValid,
  RatingNotValid,
  TrainingTimeNotValid,
  TrainingTypeNotValid,
} = WorkoutValidationMessage;

export class QueryWorkoutDto extends BasicQueryDto implements WorkoutQuery {
  @IsInt({ each: true, message: PriceNotValid })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  priceRange?: number[];

  @IsInt({ each: true, message: CaloriesAmountNotValid })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  caloriesRange?: number[];

  @Max(WORKOUT_CONSTRAINT.RATING.MAX, { message: RatingNotValid, each: true })
  @Min(WORKOUT_CONSTRAINT.RATING.MIN, { message: RatingNotValid, each: true })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  ratingRange?: number[];

  @IsEnum(TrainingTimes, { each: true, message: TrainingTimeNotValid })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  trainingTime?: string[];

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  trainingType?: string[];
}
