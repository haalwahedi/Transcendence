import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  {config}  from 'ormconfig';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
// import { ViewModule } from './game/view/view.module'
import { GameModule } from './game/game.module'
@Module({
  imports: [ UserModule, AuthModule, ChatModule, TypeOrmModule.forRoot(config),GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
