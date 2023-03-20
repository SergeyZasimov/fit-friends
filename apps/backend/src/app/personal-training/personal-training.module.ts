import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { PersonalTrainingController } from './personal-training.controller';
import { PersonalTrainingRepository } from './personal-training.repository';
import { PersonalTrainingService } from './personal-training.service';

@Module({
  imports: [NotificationModule],
  providers: [PersonalTrainingService, PersonalTrainingRepository],
  controllers: [PersonalTrainingController],
  exports: [PersonalTrainingService],
})
export class PersonalTrainingModule {}
