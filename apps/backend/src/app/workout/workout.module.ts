import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../config/multer.config';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';

@Module({
  imports: [MulterModule.registerAsync(getMulterConfig())],
  providers: [WorkoutService, WorkoutRepository],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
