import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { DatabaseModule } from '@infra/database/database.module'
import { SendNotification } from '@application/useCases/send-notification'
import { CancelNotification } from '@application/useCases/cancel-notification'
import { GetRecipientNotifications } from '@application/useCases/get-recipient-notifications'
import { CountRecipientNotifications } from '@application/useCases/count-notifications-by-recipient'
import { ReadNotification } from '@application/useCases/read-notification'
import { UnreadNotification } from '@application/useCases/unread-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
