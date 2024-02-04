import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body'
import { SendNotification } from '@application/useCases/send-notification'
import { CancelNotification } from '@application/useCases/cancel-notification'
import { CountRecipientNotifications } from '@application/useCases/count-notifications-by-recipient'
import { GetRecipientNotifications } from '@application/useCases/get-recipient-notifications'
import { ReadNotification } from '@application/useCases/read-notification'
import { UnreadNotification } from '@application/useCases/unread-notification'
import { NotificationViewModel } from '../view-models/notification-view-model'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    })

    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    })

    return {
      notifications: notifications.map((item) =>
        NotificationViewModel.toViewModel(item),
      ),
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    })

    return { notification: NotificationViewModel.toViewModel(notification) }
  }
}
