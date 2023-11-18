import { Socket } from "socket.io-client";

export interface Channel{
    id : number,
    name: string,
    type: string,
    members : User[],
    message : MessageType[]
    // image: string,
  
  }

  export interface User {
    id: number;
    userName: string;
    avatar: string;
    id_42: number;
    rank: number;
    twoFactor: boolean;
    status: string;
    friends: User[];
    blocked: User[];
    win :number;
    lose : number;
  }
  export interface MessageType{
    text: string,
    createdAt: number,
    avatar : string,
    sender : User,
  
  }

  export interface PropsSocket {
    socket : Socket
  }