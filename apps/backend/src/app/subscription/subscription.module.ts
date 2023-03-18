import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { WorkoutModule } from '../workout/workout.module';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [WorkoutModule, ProfileModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository],
})
export class SubscriptionModule {}
