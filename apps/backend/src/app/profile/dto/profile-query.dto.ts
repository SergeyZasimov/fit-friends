import { ProfileQuery, SortOption, SortType } from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max } from 'class-validator';
import {
  DEFAULT_PROFILE_QUERY,
  ProfileQueryValidationMessage,
} from '../profile.constant';

export class ProfileQueryDto implements ProfileQuery {
  @Transform(({ value }) => +value)
  @Max(DEFAULT_PROFILE_QUERY.LIMIT, {
    message: ProfileQueryValidationMessage.LimitNotValid,
  })
  @IsOptional()
  limit: number = DEFAULT_PROFILE_QUERY.LIMIT;

  @Transform(({ value }) => +value)
  @IsInt({ message: ProfileQueryValidationMessage.PageNotValid })
  @IsOptional()
  page: number = DEFAULT_PROFILE_QUERY.PAGE;

  @IsEnum(SortType, { message: ProfileQueryValidationMessage.SortTypeNotValid })
  @IsOptional()
  sortType: string = DEFAULT_PROFILE_QUERY.SORT_TYPE;

  @IsEnum(SortOption, {
    message: ProfileQueryValidationMessage.SortOptionNotValid,
  })
  @IsOptional()
  sortOption: string = DEFAULT_PROFILE_QUERY.SORT_OPTION;
}
