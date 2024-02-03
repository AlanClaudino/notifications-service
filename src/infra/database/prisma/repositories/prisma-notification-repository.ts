import { Notification } from '@application/entities/notification'
import { NotificationsRepository } from '@application/repositories/notification-repositories'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: prismaNotification,
    })
  }
}
