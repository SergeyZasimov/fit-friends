import { Module } from '@nestjs/common';
import { PersonalTrainingController } from './personal-training.controller';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingService } from './personal-training.service';

@Module({
  providers: [PersonalTrainingService, PersonalTrainingRepository],
  controllers: [PersonalTrainingController],
})
export class PersonalTrainingModule {}
