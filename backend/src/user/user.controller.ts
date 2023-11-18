import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDto, updateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import {Request} from 'express';
import { IntegerType } from 'typeorm';
import { jwtGuard } from 'src/auth/Guards';
import { User } from 'src/entities/user.entity';

@Controller('user')
export class UserController {
    constructor (private readonly userService : UserService){}
   
    //http://localhost:3001/api/user/all
    @Get('all')
    getusers()
    {
        return this.userService.findAll();
    }

    @Get('rank')
    getRank()
    {
        return this.userService.getTopUsers();
    }


    @UseGuards(jwtGuard)
    @Get('me')
    getme(@Req() req : Request)
    {
        const user = req.user as User;
        // console.log(user);
        return this.userService.getuser(user.id);
      
    }

    // @UseGuards(jwtGuard)
    // @Get('match')
    // getmatch(@Req() req : Request)
    // {
    //     const user = req.user as User;
    //     console.log("match");
    //     return this.userService.getmatch(user.id);
      
    // }

    @UseGuards(jwtGuard)
    @Get('friends')
    getfriends(@Req() req : Request)
    {
        const user = req.user as User;
        return this.userService.getfriends(user.id);
      
    }
   
    @UseGuards(jwtGuard)
    @Get('friendsReq')
    getfriendsReq(@Req() req : Request)
    {
        const user = req.user as User;
        return this.userService.getfriendsReq(user.id);
      
    }

    @Patch()
    updateUser(@Body() updateuser : updateUserDto)
    {
        const id = 1;
        return this.userService.updateUser(id, updateuser);
    }

    @Get(":id")
    getuser(@Param('id', ParseIntPipe) id: number)
    {
        return this.userService.getuser(id);
    }

     // @Post()
    // create(@Body() body: CreateUserDto)
    // {
    //     //const {...dtails, email} = body; then you can remove unwanted data 
    //     return this.userService.create(body.userName);
    // }
    // @Patch(':id')
    // updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateuser : updateUserDto)
    // {
    //     return this.userService.updateUser(id, updateuser);
    // }
    // @Delete(':id')
    // deleteuser(@Param('id', ParseIntPipe) id: number)
    // {
    //     return this.userService.deleteuser(id);
    // }
    // @Post(':id/friends/:friendId')
    // addFriend(@Param('id', ParseIntPipe) id: number, @Param('friendId', ParseIntPipe) friendId: number){
    //     return this.userService.addFriend(id, friendId);
    // }
    // @Get(':id/friends')
    // getFriends(@Param('id', ParseIntPipe) id: number)
    // {
    //     return this.userService.getFriends(id);
    // }
}
