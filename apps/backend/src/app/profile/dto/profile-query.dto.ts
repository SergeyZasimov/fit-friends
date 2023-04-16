import {
  Locations,
  ProfileQuery,
  TrainingLevels,
  TrainingTypes,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { BasicQueryDto } from '../../query/basic-query.dto';

export class ProfileQueryDto extends BasicQueryDto implements ProfileQuery {
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsOptional()
  isReadyToTraining?: boolean;

  @IsEnum(Locations, { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  location?: string[];

  @IsEnum(TrainingLevels)
  @IsOptional()
  trainingLevel?: string;

  @IsEnum(TrainingTypes, { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  trainingType?: string[];
}
