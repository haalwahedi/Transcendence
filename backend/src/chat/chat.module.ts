import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { chatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Message } from 'src/entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Friendship } from 'src/entities/friend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Message, Friendship]), UserModule, AuthModule],
  controllers: [ChatController],
  providers: [ChatService, chatGateway]
})
export class ChatModule {}
