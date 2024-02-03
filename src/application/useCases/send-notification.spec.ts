import { SendNotification } from './send-notification'
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notification-repository'

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      recipientId: 'example-recipient-id',
      category: 'social',
      content: 'This is a notification',
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0]).toEqual(notification)
  })
})
