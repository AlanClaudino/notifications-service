import { Injectable } from '@nestjs/common'
import { NotificationsRepository } from '@application/repositories/notification-repositories'
import { NotificationNotFoundError } from './Errors/error-notification-not-found'

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = void

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }

    notification.read()

    await this.notificationsRepository.save(notification)
  }
}
