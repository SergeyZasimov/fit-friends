import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, NotificationRepository],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
