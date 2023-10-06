import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Match } from 'src/entities/match.entity';
import { Friendship } from 'src/entities/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Match, Friendship])],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService],
})
export class UserModule {}
