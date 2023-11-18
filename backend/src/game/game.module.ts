import { Module } from '@nestjs/common'

import { GameGateway } from './game.gateway'
@Module({
  imports: [],
  providers: [GameGateway],
  controllers: []
})

export class GameModule {}
