import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';

@Module({
  providers: [WorkoutService, WorkoutRepository],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
