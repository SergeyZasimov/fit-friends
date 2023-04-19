import { GymParameters, Locations, QuerySportGym } from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';

export class QuerySportGymDto extends BasicQueryDto implements QuerySportGym {
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value.split(',').map((item: string) => parseInt(item))
  )
  @IsOptional()
  priceRange?: number[];

  @IsEnum(Locations, { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  location?: string[];

  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsOptional()
  status?: boolean;

  @IsEnum(GymParameters, { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  parameters?: string[];
}
