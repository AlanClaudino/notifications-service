import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository'
import { CountRecipientNotifications } from './count-notifications-by-recipient'
import { makeNotification } from '@test/factories/notification-factory'

describe('Count notifications by recipient', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countNotifications = new CountRecipientNotifications(
      notificationsRepository,
    )

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    )

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    )

    const { count } = await countNotifications.execute({
      recipientId: 'recipient-1',
    })

    expect(count).toEqual(2)
  })
})
