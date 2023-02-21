import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
