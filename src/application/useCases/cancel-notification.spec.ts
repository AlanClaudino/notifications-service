import { Notification } from '@application/entities/notification'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository'
import { Content } from '@application/entities/content'
import { CancelNotification } from './cancel-notification'
import { NotificationNotFoundError } from './Errors/error-notification-not-found'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      category: 'social',
      content: new Content('New friend request'),
      recipientId: 'example-recipient-id',
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({ notificationId: notification.id })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to cancel a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      })
    }).rejects.toThrow(NotificationNotFoundError)
  })
})
