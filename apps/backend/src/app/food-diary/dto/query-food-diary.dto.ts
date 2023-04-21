import { QueryFoodDiary } from '@fit-friends/shared';
import { IsDateString } from 'class-validator';

export class QueryFoodDiaryDto implements QueryFoodDiary {
  @IsDateString()
  weekBegin: Date;

  @IsDateString()
  weekEnd: Date;
}
