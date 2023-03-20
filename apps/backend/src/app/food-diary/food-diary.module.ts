import { Module } from '@nestjs/common';
import { FoodDiaryController } from './food-diary.controller';
import { FoodDiaryRepository } from './food-diary.repository';
import { FoodDiaryService } from './food-diary.service';

@Module({
  providers: [FoodDiaryService, FoodDiaryRepository],
  controllers: [FoodDiaryController],
  exports: [FoodDiaryService],
})
export class FoodDiaryModule {}
