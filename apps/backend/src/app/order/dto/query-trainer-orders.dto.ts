import { SortOption } from '@fit-friends/shared';
import { IsEnum, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';
import { QueryValidationMessage } from '../../query/query.constant';
import { DEFAULT_TRAINER_ORDERS_SORTING_OPTION } from '../order.constant';

export class TrainerOrdersQuery extends BasicQueryDto {
  @IsEnum(SortOption, {
    message: QueryValidationMessage.SortOptionNotValid,
  })
  @IsOptional()
  sortOption: string = DEFAULT_TRAINER_ORDERS_SORTING_OPTION;
}
