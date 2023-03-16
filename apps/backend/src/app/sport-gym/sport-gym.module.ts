import { Module } from '@nestjs/common';
import { SportGymRepository } from './sport-gym.repository';
import { SportGymService } from './sport-gym.service';

@Module({
  providers: [SportGymService, SportGymRepository],
  exports: [SportGymService],
})
export class SportGymModule {}
