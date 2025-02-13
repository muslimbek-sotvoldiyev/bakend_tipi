import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([User]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'your_secret_key', // JWT uchun maxfiy kalit
    signOptions: { expiresIn: '1h' }, // Token muddati
  }),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
