import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { SportGymModule } from '../sport-gym/sport-gym.module';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule, NotificationModule, SportGymModule],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
