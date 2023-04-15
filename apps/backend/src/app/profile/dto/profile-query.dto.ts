import { ProfileQuery } from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';

export class ProfileQueryDto extends BasicQueryDto implements ProfileQuery {
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsOptional()
  isReadyToTraining?: boolean;
}
