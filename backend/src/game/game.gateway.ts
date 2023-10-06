import { WebSocketGateway,WebSocketServer ,OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import  Lobby  from './game/lobby';
import  RoomManager  from './game/room_manager';
import { Logger } from '@nestjs/common';

// @WebSocketGateway(3010,{ namespace: 'game',cors:"*:*" })

@WebSocketGateway({ namespace: 'game',cors:"*:*" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer() server!: Server;

    private logger : Logger;
    private lobby: Lobby;
    private roomManager!: RoomManager;
    
    constructor() {
      this.lobby = new Lobby();
      this.logger = new Logger("Mango");

    }
    
  afterInit(server: Server) {
    this.logger.log('Socket.io Server Initialized');
    // console.log(server)
    this.roomManager = new RoomManager(server)
  }

  handleConnection(client: Socket) {
    console.log(client.id + ' joined game');
    this.lobby.add_player(client.id, 'default', 'public');
    console.log(this.lobby.get_num_player());

    if (this.lobby.get_num_player() % 2 === 0 && this.lobby.get_num_player() > 0) {
      let player1 = this.lobby.public_queue.shift();
      let player2 = this.lobby.public_queue.shift();
      this.roomManager.create_room(player1, player2);
    }

    client.on('disconnect', () => {
      const room = this.roomManager.find_room(client.id);
      if (room != null) {
        room.disconnect(client.id);
      }
      if (this.roomManager.rooms["public"] != null) {
        delete this.roomManager.rooms["public"];
      }
      this.lobby.remove_player(client.id);
    });

    client.on('keydown', (keycode) => {
      if (this.roomManager.num_rooms > 0) {
        let user = this.roomManager.find_user(client.id);
        if (user != null) {
          if (keycode !== 32) {
            this.roomManager.find_user(client.id).keypress[keycode] = true;
          }
        }
      }
    });
    setInterval(() => {
        this.roomManager.update();
      }, 60);
    client.on('keyup', (keycode) => {
      if (this.roomManager.num_rooms > 0) {
        let user = this.roomManager.find_user(client.id);
        if (user != null) {
          this.roomManager.find_user(client.id).keypress[keycode] = false;
        }
      }
    });

    client.on('space_event', (space) => {
      if (this.roomManager.num_rooms > 0) {
        let user = this.roomManager.find_user(client.id);
        const SPACE = 32;
        if (user != null) {
          if (space === 1) {
            this.roomManager.find_user(client.id).keypress[SPACE] = true;
          } else if (space === 0) {
            this.roomManager.find_user(client.id).keypress[SPACE] = false;
          }
        }
      }
    });
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + ' left game');
  }
}


