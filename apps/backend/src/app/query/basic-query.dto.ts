import { BasicQuery, SortOption, SortType } from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max } from 'class-validator';
import {
  DEFAULT_QUERY_CONSTRAINT,
  QueryValidationMessage,
} from './query.constant';

export class BasicQueryDto implements BasicQuery {
  @Transform(({ value }) => parseInt(value))
  @Max(DEFAULT_QUERY_CONSTRAINT.LIMIT, {
    message: QueryValidationMessage.LimitNotValid,
  })
  @IsOptional()
  limit: number = DEFAULT_QUERY_CONSTRAINT.LIMIT;

  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: QueryValidationMessage.PageNotValid })
  @IsOptional()
  page: number = DEFAULT_QUERY_CONSTRAINT.PAGE;

  @IsEnum(SortType, { message: QueryValidationMessage.SortTypeNotValid })
  @IsOptional()
  sortType: string = DEFAULT_QUERY_CONSTRAINT.SORT_TYPE;

  @IsEnum(SortOption, {
    message: QueryValidationMessage.SortOptionNotValid,
  })
  @IsOptional()
  sortOption: string = DEFAULT_QUERY_CONSTRAINT.SORT_OPTION;
}
