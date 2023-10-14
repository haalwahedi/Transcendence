import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/entities/channel.entity';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { And, Repository } from 'typeorm';
import {ChannelType} from '../entities/channel.entity'
import { CreateGroupDto } from './dtos/chat.dto';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as bcrypt from "bcrypt";
import { Friendship } from 'src/entities/friend.entity';

@Injectable()
export class ChatService {

    constructor(@InjectRepository(Channel) private channelRepo : Repository<Channel>,
    @InjectRepository(Message) private messageRepo : Repository<Message>,
    @InjectRepository(Friendship) private FriendshipRepo : Repository<Friendship>,
    private readonly userService : UserService){}

    //---------- crate new message ---------------------
    async create(user_id: number, mes : string, channel_id : number)
    {
        const channel = await this.channelRepo.findOne({where: {id : channel_id}});
        const user = await this.userService.getuser(user_id);
        const message = this.messageRepo.create({text: mes, sender : user, receiver : channel});
        return await this.messageRepo.save(message);
    }

     //---------- check Protected group password  ---------------------
    async checkPass(pass : string, channel_id : number){
         const channel = await this.channelRepo.findOne({where: {id : channel_id}});
         if (channel.password === pass)
            return true;
        else
            return false;
    }

     //---------- create group ---------------------
    async createGroup(user: User, name : string, type : string, pass : string, members : User[])
    {
        const ch_type = this.stringToChannelType(type);
      
        if (pass)
            pass = pass;
  
        const channel = this.channelRepo.create({name : name, type : ch_type, password : pass, owner: user, admins: [user], members : members} )
       
        return {channel : await this.channelRepo.save(channel)};
   
    }

     async acceptFriend(client: Socket, id : number){
         const user1 = await this.userService.getuser(client.data.user.id);
         const fri = await this.FriendshipRepo.findOne({where: {id : id}, relations: ['user1']})
         console.log(fri)
        const friend = fri.user1;
        const name = user1.id + "_" + friend.id;
       
        const channel = (await this.createGroup(user1, name, "direct", null, [user1,friend])).channel
        await this.userService.addFriend(user1.id, friend.id);
        
        await this.FriendshipRepo.delete(id);
       
       return {req : await this.userService.getfriendsReq(user1.id), channel : channel};
        
    }

     async rejectFriend(client: Socket,id : number){
         const user1 = await this.userService.getuser(client.data.user.id);
        
        await this.FriendshipRepo.delete(id);
     
       return {req : await this.userService.getfriendsReq(user1.id)};
        
    }

    async addFriend(client: Socket,userName : string){
        const user1 = await this.userService.getuser(client.data.user.id);
        const user = await this.userService.getUserByname(userName);
        if (!user)
            return {alert : "User not found"};
       
        const exist = user1.friends.findIndex((friend) => friend.id === user.id);
        if (exist >= 0 || user.id == user1.id)
            return {alert : "User already exist"};
       
       const f = await this.FriendshipRepo.create({user1 : user1,user2 : user})
       this.FriendshipRepo.save(f)
       return {req : this.userService.getfriendsReq(user1.id)};
        
    }

    async findAll(){
         return await this.channelRepo.find();
    }
     //---------- add user to group ---------------------
    async addUser(data : any, client : Socket) //dto
    {
        
        const user = await this.userService.getUserByname(data.userName);
        if (!user)
            return {alert : "User not found"};
        const channel = await this.findChannel(data.chId);
        if(!channel)
            return {alert : "Channel not found"};
            console.log(channel.id)
        if(!(await this.is_admin(client.data.user.id, channel.id)))
            return {alert : "You have to be group admin to add a member!"};
        channel.members.push(user);
        return {channel : this.channelRepo.save(channel)};
    }
   
    async KickUser(data : any, client : Socket) //dto
    {
        const user = await this.userService.getuser(client.data.user.id);
        const ch = await this.findChannel(data.chId);
        if(!await this.is_admin(user.id, ch.id))
            return {alert : "You have to be group admin to kick a member!"};
        const userToKick = await this.userService.getuser(data.member);
        if (userToKick.id == ch.owner.id)
            return {alert : "You can't kick group owner!"};

        const newList = ch.members.filter((user) => user.id !== userToKick.id);
        ch.members = newList;
        return {channel : await this.channelRepo.save(ch)}  
     }
     async addAdmin( client : Socket, data : any){
        // const user = await this.userService.getuser(client.data.user.id);
        const ch = await this.findChannel(data.chId);
        if(client.data.user.id !== ch.owner.id)
            return {alert : "You have to be the channel owner to set Admin"};
        if(await this.is_admin(data.member, ch.id))
            return {alert : "User is admin"};
        const user = await this.userService.getuser(data.member);
        ch.admins.push(user);
        return {channel: await this.channelRepo.save(ch)}
     }

     async RemoveAdmin( client : Socket, data : any){
        
        const ch = await this.findChannel(data.chId);
        if(client.data.user.id !== ch.owner.id)
            return {alert : "You have to be the channel owner to remove Admin"};
        if(!(await this.is_admin(data.member, ch.id)))
            return {alert : "User is not admin"};
        const user = await this.userService.getuser(data.member);
        const newList = ch.admins.filter((u) => u.id !== user.id);
        ch.admins = newList;
        return {channel : await this.channelRepo.save(ch)}  
     } 
     async MuteUser(data : any, client : Socket) //dto
     {
         const user = await this.userService.getuser(client.data.user.id);
         const ch = await this.findChannel(data.chId);
         if(!(await this.is_admin(user.id, ch.id)))
             return {alert : "You have to be group admin to Mute a member!"};
         const userToMute = await this.userService.getuser(data.member);
         if (userToMute.id == ch.owner.id)
             return {alert : "You can't Mute group owner!"};
         ch.mute.push()
         return {channel : await this.channelRepo.save(ch)}  
      }
     // ----------------- remove protected group password ------------ 
    async RemovePassword(user_id: number, channel_id : number)
    {
       
        const channel = await this.findChannel(channel_id);
        if(user_id !== channel.owner.id)
            return {alert : "You have to be the channel owner to remove the password"};
        if (channel.type != "protected")
            return {alert : "Group is not protected"};
        return {channel : this.channelRepo.update(channel.id, {password : null} )}
   
    }

    // ----------------- set protected group password ------------ 
    async setPassword(user_id: number, channel_id : number, new_pass : string)
    {
       
        const channel = await this.findChannel(channel_id);
        if(user_id !== channel.owner.id)
            return {alert : "You have to be the channel owner to set the password"};
        if (channel.type != "protected")
            return {alert : "Group is not protected"};
        
        channel.password = new_pass;
        return {channel : await this.channelRepo.save(channel)}
   
    }


    // ----------- get channel data with id ---------------
    async findChannel(id : number)
    {
        return await this.channelRepo.findOne({where: {id : id}, relations: ['message', 'members', 'message.sender', 'owner', 'admins']});
    }

    // -------- get all groups --------------
    async findGroups(id : number)
    {
        const channels =  await this.channelRepo.createQueryBuilder('channel')
                            .leftJoin('channel.members', 'user')
                            .where('channel.type != :type',{ type : "direct"})
                            .andWhere('user.id = :id',{ id : id})
                            .select('channel.id')
                            .getMany()
        const chIds = channels.map((c) => c.id);
        let ch = []
        if (chIds.length > 0)
        {ch =  await this.channelRepo.createQueryBuilder('channel')
                            .leftJoinAndSelect('channel.members', 'user')
                            .where('channel.id IN (:...id) ',{ id : chIds})
                            .getMany()}
        return ch;
    }
     // -------- get all direct groups --------------
    async findfriends(id : number){
         const channels =  await this.channelRepo.createQueryBuilder('channel')
                            .leftJoin('channel.members', 'user')
                            .where('channel.type = :type',{ type : "direct"})
                            .andWhere('user.id = :id',{ id : id})
                            .select('channel.id')
                            .getMany()
            const chIds = channels.map((c) => c.id);
            let ch = []
            if (chIds.length > 0)
                {ch =  await this.channelRepo.createQueryBuilder('channel')
                .leftJoinAndSelect('channel.members', 'user')
                .where('channel.id IN (:...id) ',{ id : chIds})
                .getMany()}
           
        return ch
    }

    //---------------- utils --------------------------

    stringToChannelType(typeString: string): ChannelType | undefined {
        switch (typeString) {
            case 'public':
                return ChannelType.PUBLIC;
            case 'private':
                return ChannelType.PRIVATE;
            case 'protected':
                return ChannelType.PROTECTED;
            case 'direct':
                return ChannelType.DIRECT;
            default:
                return undefined; // Handle invalid input gracefully
        }
      }

      async is_admin(user_id: number, channel_id : number)
      {
          const user = await this.userService.getuser(user_id);
          const channel = await this.findChannel(channel_id);
          const ids = channel.admins?.map((ad) => ad.id)
          return ids?.includes(user.id);
      }

    

}
