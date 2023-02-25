import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../config/multer.config';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule, MulterModule.registerAsync(getMulterConfig())],
  providers: [ProfileRepository, ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
