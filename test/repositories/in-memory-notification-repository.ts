import { Notification } from '../../src/application/entities/notification'
import { NotificationsRepository } from '../../src/application/repositories/notification-repositories'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    )

    if (!notification) {
      return null
    }

    return notification
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => {
      return item.recipientId === recipientId
    }).length
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    )

    this.notifications[notificationIndex] = notification
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }
}
