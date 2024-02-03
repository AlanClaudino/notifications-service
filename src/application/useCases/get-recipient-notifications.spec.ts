import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository'
import { makeNotification } from '@test/factories/notification-factory'
import { GetRecipientNotifications } from './get-recipient-notifications'

describe('Get notifications by recipient', () => {
  it('should be able to get all notifications sent to a recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getNotifications.execute({
      recipientId: 'recipient-1',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    )
  })
})
