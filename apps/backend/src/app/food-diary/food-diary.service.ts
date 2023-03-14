import { FoodDiary } from '@fit-friends/shared';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { UpdateFoodDiaryDto } from './dto/update-food-diary';
import { FoodDiaryExceptionMessage } from './food-diary.constant';
import { FoodDiaryEntity } from './food-diary.entity';
import { FoodDiaryRepository } from './food-diary.repository';

@Injectable()
export class FoodDiaryService {
  constructor(private readonly foodDiaryRepository: FoodDiaryRepository) {}

  async create(userId: number, dto: CreateFoodDiaryDto): Promise<FoodDiary> {
    const foodDiaryEntity = new FoodDiaryEntity({ ...dto, userId });
    return this.foodDiaryRepository.create(foodDiaryEntity);
  }

  async getOne(userId: number, id: number): Promise<FoodDiary> {
    return this.checkOwner(userId, id);
  }

  async getMany(userId: number): Promise<FoodDiary[]> {
    return this.foodDiaryRepository.findMany(userId);
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateFoodDiaryDto
  ): Promise<FoodDiary> {
    const foodDiary = await this.checkOwner(userId, id);

    const foodDiaryEntity = new FoodDiaryEntity({ ...foodDiary, ...dto });
    return this.foodDiaryRepository.update(id, foodDiaryEntity);
  }

  async delete(userId: number, id: number): Promise<FoodDiary> {
    await this.checkOwner(userId, id);
    return await this.foodDiaryRepository.delete(id);
  }

  private async checkExist(id: number): Promise<FoodDiary> {
    const result = await this.foodDiaryRepository.findOne(id);

    if (!result) {
      throw new NotFoundException(FoodDiaryExceptionMessage.NotFound);
    }

    return result;
  }

  private async checkOwner(userId: number, id: number): Promise<FoodDiary> {
    const foodDiary = await this.checkExist(id);

    if (foodDiary.userId !== userId) {
      throw new ForbiddenException(FoodDiaryExceptionMessage.ForeignFoodDiary);
    }

    return foodDiary;
  }
}
