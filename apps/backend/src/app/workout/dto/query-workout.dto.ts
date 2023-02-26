import { TrainingTimes, WorkoutQuery } from '@fit-friends/shared';
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
    value.split(', ').map((item: string) => parseInt(item))
  )
  @IsOptional()
  caloriesRange?: number[];

  @Max(WORKOUT_CONSTRAINT.RATING.MAX, { message: RatingNotValid })
  @Min(WORKOUT_CONSTRAINT.RATING.MIN, { message: RatingNotValid })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  rating?: number;

  @IsEnum(TrainingTimes, { each: true, message: TrainingTimeNotValid })
  @IsOptional()
  trainingTime?: string[];
}
