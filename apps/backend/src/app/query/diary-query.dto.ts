import { QueryDiary } from '@fit-friends/shared';
import { IsDateString } from 'class-validator';

export class QueryDiaryDto implements QueryDiary {
  @IsDateString()
  weekBegin: Date;

  @IsDateString()
  weekEnd: Date;
}
