import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',
      autoLoadModels: true,
      // synchronize: true,
    }),
    UsersModule,
    NewsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
