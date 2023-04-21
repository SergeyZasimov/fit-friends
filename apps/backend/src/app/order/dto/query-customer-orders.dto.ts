import { OrderType } from '@fit-friends/shared';
import { IsEnum, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';

export class QueryCustomerOrdersDto extends BasicQueryDto {
  @IsEnum(OrderType)
  @IsOptional()
  orderType?: string;
}
