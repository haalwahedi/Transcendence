import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { SrvRecord } from 'dns';
import { get } from 'http';
import { Message } from 'src/entities/message.entity';
import { ChatService } from './chat.service';
import { jwtGuard } from 'src/auth/Guards';
import {Request } from "express"
import { User } from 'src/entities/user.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService : ChatService){}

      @Get('all')
    getusers()
    {
        return this.chatService.findAll();
    }
    @Get('/channel/:id')
    findChannel(@Param('id', ParseIntPipe) id: number)
    {
        return this.chatService.findChannel(id);
    }
    @Get('/Groups')
    @UseGuards(jwtGuard)
    findPublicChannel(@Req() req : Request)
    {
        const user = req.user as User;
        return this.chatService.findGroups(user.id);
    }
    @Get('/friends')
    @UseGuards(jwtGuard)
    async findDirectChannel(@Req() req : Request)
    {
        const user = req.user as User;
        return await this.chatService.findfriends(user.id);
    }
    // @Get('/Groups/:id')
    // findChannels(@Param('id', ParseIntPipe) id: number)
    // {
    //     return this.chatService.getUserChannels(id);
    // }
    // @Get('/:id/messages')
    // findMessages(@Param('id', ParseIntPipe) id: number)
    // {
    //     return this.chatService.findall(id);
    // }
    // @Post('/add')
    // addMessage(@Body() mess :any){
    //     console.log(mess);
    // }
}
