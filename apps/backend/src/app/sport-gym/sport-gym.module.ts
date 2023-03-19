import { Module } from '@nestjs/common';
import { SportGymRepository } from './sport-gym.repository';
import { SportGymService } from './sport-gym.service';
import { SportGymController } from './sport-gym.controller';

@Module({
  providers: [SportGymService, SportGymRepository],
  exports: [SportGymService],
  controllers: [SportGymController],
})
export class SportGymModule {}
