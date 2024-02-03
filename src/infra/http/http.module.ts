import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { SendNotification } from '@application/useCases/send-notification'
import { DatabaseModule } from '@infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
