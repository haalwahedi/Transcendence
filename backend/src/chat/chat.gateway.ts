import { WebSocketGateway,
         SubscribeMessage,
         WebSocketServer,
         OnGatewayConnection,
         OnGatewayDisconnect, 
         MessageBody,
         ConnectedSocket, 
         } 
    from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import {Socket, Server} from 'socket.io';
import { Logger, OnModuleInit} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateGroupDto, sendMessageDto } from "./dtos/chat.dto";
import { parse } from "cookie";
import { AuthService } from "src/auth/auth.service";


@WebSocketGateway({
    cors: {
        origin: '*',
      },
    namespace : '/chat'
})
export class chatGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private readonly chatService : ChatService, private readonly userService : UserService,
        private readonly authService : AuthService) {}
    private logger = new Logger('ChatGateway');
    @WebSocketServer()
    server : Server;

    onModuleInit() {
        this.logger.log("Initilaized");
    }
    handleDisconnect(client: Socket) {
        // const user = JSON.stringify(client.data.user);
        console.log(`Disconnected: ${client.id}`);
      }
   
      async handleConnection(@ConnectedSocket() client: Socket) {
        console.log(`Connected ${client.id}`);
        // console.log(client.handshake.headers)
        let cookies = client.handshake.headers['cookie'];
        if (typeof cookies !== 'string') {
            cookies = '';
          }
       
        const {access_token : token} = parse(cookies);
        if(!token)
        {
            client.disconnect()
            return 
        } 

        const id = await this.authService.getPayload(token);
        
        client.data.user = await this.userService.getuser(id);
        console.log(client.data.user?.userName);
        //  console.log(this.server.sockets.sockets);
       
      }

   

    @SubscribeMessage('SendMessage')
    async create(@ConnectedSocket() client: Socket, @MessageBody() data: sendMessageDto){
        try{
            // console.log(client.data.user.id + " " + data.text + " " + data.channel_id);
            const message = await this.chatService.create(client.data.user.id,data.text, data.channel_id);
            this.server.to(data.channel_id.toString()).emit('newMessage', message);
            return message;
        }
        catch {}
    }

    // ------------ add user to a group ---------
    @SubscribeMessage('AddUser')
    async addUser(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data.userName);
     console.log(data.chId.toString())
        const add = await this.chatService.addUser(data, client);
        if (add.alert)
            client.emit("alert", add.alert)
        else
            {
                this.server.to(data.chId.toString()).emit("updateMembers", (await add.channel).members)
            }
       
    }

     // ------------ KICK user from a group ---------
     @SubscribeMessage('KickUser')
     async KickUser(@ConnectedSocket() client: Socket, @MessageBody() data: any){
         console.log("user " +client.data.user.id + " want to kick " + data.member + " from channel " + data.chId );
      
         const add = await this.chatService.KickUser(data, client);
         if (add.alert)
             client.emit("alert", add.alert)
         else
              this.server.to(data.chId.toString()).emit("updateMembers", add.channel.members)
     }

    // ------------ Mute user in a group ---------
    @SubscribeMessage('MuteUser')
    async MuteUser(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log("user " + client.data.user.id + " want to Mute " + data.member + " from channel " + data.chId );
     
         const add = await this.chatService.MuteUser(client, data);
         if (add.alert)
             client.emit("alert", add.alert)
        // //  else
        // //      client.emit("updateMembers", add.channel)
    }

    // ------------ set new admin ---------
    @SubscribeMessage('setAdmin')
    async AddAdmin(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log("user " + client.data.user.id + " want to AddAdmin " + data.member + " to channel " + data.chId );
        
         const add = await this.chatService.addAdmin(client, data);
         if (add.alert)
             client.emit("alert", add.alert)
        // //  else
        // //      client.emit("updateMembers", add.channel)
    }

    @SubscribeMessage('JoinRoom')
    async JoinRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log("user " + client.data.user.id + " JoinRoom " +  data.chId );
        client.join(data.chId.toString());
        //  const add = await this.chatService.addAdmin(client, data);
        //  if (add.alert)
        //      client.emit("alert", add.alert)
        // //  else
        // //      client.emit("updateMembers", add.channel)
    }

    @SubscribeMessage('RemoveAdmin')
    async RemoveAdmin(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log("user " + client.data.user.id + " want to RemoveAdmin " + data.member + " to channel " + data.chId );
        
         const ret = await this.chatService.RemoveAdmin(client, data);
         if (ret.alert)
             client.emit("alert", ret.alert)
        // //  else
        // //      client.emit("updateMembers", add.channel)
    }


        // ------------ add Friend ---------
        @SubscribeMessage('AddFriend')
        async addFriend(@ConnectedSocket() client: Socket, @MessageBody() data: string){
          
            const add = await this.chatService.addFriend(client,data);
            if (add.alert)
            {
                client.emit("alert", add.alert)
            }
            else
                {
                    // console.log(this.server.sockets)
                    this.server.emit("friendReq", add.req);//change
                }
           
        }

        @SubscribeMessage('rejectFriend')
        async rejectFriend(@ConnectedSocket() client: Socket, @MessageBody() data: number){
            const add = await this.chatService.rejectFriend(client,data);
            
            client.emit("friendReq", add.req);
           
        }

        @SubscribeMessage('acceptFriend')
        async acceptFriend(@ConnectedSocket() client: Socket, @MessageBody() data: number){
          
            const add = await this.chatService.acceptFriend(client,data);
            
            client.emit("friendReq", add.req);
            if(add.channel)
            {
               
                    client.emit('updateGroups', add.channel);
            }
        }
    
    @SubscribeMessage('CreateGroup')
    async handleCreateGroup(@ConnectedSocket() client: Socket, @MessageBody() group: CreateGroupDto){
        try{
            console.log('creating group ...')
            const user = await this.userService.getuser(client.data.user.id);
            let data;
            if (group.type === "private")
            {
                data = await this.chatService.createGroup(user,group.name, group.type, group.pass, [user]);
                if (data.channel)
                    client.emit('updateGroups', data.channel);
            }
            else
            {
                data = await this.chatService.createGroup(user,group.name, group.type, group.pass, await this.userService.findAll());
                if (data.channel)
                    this.server.emit('updateGroups', data.channel);
            }
            
        }
        catch {}
       
    }

    @SubscribeMessage('RemovePassword')
    async handleJoinRoom(@ConnectedSocket() client: Socket,@MessageBody() data: any){
       
        const ret = await this.chatService.RemovePassword(client.data.user.id,  data.chId);
        if(ret.alert)
            client.emit("alert", ret.alert)
    }

    @SubscribeMessage('checkPass')
    async checkPass(@ConnectedSocket() client: Socket,@MessageBody() data: any){
       
        console.log(data.pass)
        const res : boolean= await this.chatService.checkPass(data.pass,  data.chId);
        console.log(res)
        client.emit("checkPass", {pass :res})
        // const ret = await this.chatService.RemovePassword(client.data.user.id,  data.chId);
        // if(ret.alert)
        //     client.emit("alert", ret.alert)
    }

    @SubscribeMessage('ChangeUsername')
    handleChangeUsername(){
        console.log('handle ChangeUsername');
    }

    @SubscribeMessage('SetPassword')
    async setPass(@ConnectedSocket() client: Socket, @MessageBody() data: any){
            const ret = await this.chatService.setPassword(client.data.user.id,  data.chId, data.password);
            if(ret.alert)
                client.emit("alert", ret.alert)
    }


    // @SubscribeMessage('findAllMessages')
    // findall(){
    //     this.chatService.findall();
    // }
}
//@connectedSocket() client : Socket
//client.broadcast.emit('event', payload);