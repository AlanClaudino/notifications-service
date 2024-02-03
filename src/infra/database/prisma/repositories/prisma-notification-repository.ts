import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notification-repositories'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    })

    if (!notification) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    })

    return notifications.map((item) => PrismaNotificationMapper.toDomain(item))
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    })

    return count
  }

  async create(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: prismaNotification,
    })
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.update({
      where: {
        id: prismaNotification.id,
      },
      data: prismaNotification,
    })
  }
}
