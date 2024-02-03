import { Module } from '@nestjs/common'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { NotificationsRepository } from '@application/repositories/notification-repositories'
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/prisma-notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
