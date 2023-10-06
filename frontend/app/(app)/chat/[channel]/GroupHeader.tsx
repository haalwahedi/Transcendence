"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import React, { FC, useEffect, useState } from 'react'
import {Avatar} from "react-daisyui";
import { GroupSeting, RemovePassword, SetPassword } from "./remove";

import  {AddToChannel}  from "./add_to_channel";
  
  import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import { Channel, User } from "../../../../types/types";
import {PropsSocket} from "../../../../types/types"

const items = [
  {
    key: "kick",
    label: "kick Person",
    event : "KickUser",
  },
  {
    key: "mute",
    label: "mute Person",
    event : "MuteUser",
  },
  {
    key: "set as admin",
    label: "set as admin",
    event : "setAdmin",
  },
  {
    key: "remove as admin",
    label: "remove as admin",
    event : "RemoveAdmin",
  },
  {
    key: "id person",
    label: "invite to game",
    event : "InviteToGame",
  },

];
export interface ChannelProps{
  chId : number, 
  socket : Socket
}

export interface ListProps{
  chId : number, 
  socket : Socket,
  member : number
}
export  const ChatOp = ({ chId, socket, member} : ListProps ) => {

  function handleEvent(event : string){
    socket.emit(event, { chId, member})
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <IconButton 
           className="w-2 h-2"> 
          { ""}
        </IconButton >
      </DropdownTrigger>

        <div className="border-solid border-2 border-deep-purple-900 bg-white		 ">
      <DropdownMenu aria-label="Dynamic Actions" items={items}  className=" border-solid border-2 border-deep-purple-900 bg-white	  ">
        {(item : any) => (
          <DropdownItem 
            key={item.key}
            color={item.key === "kick" ? "danger" : "default"}
            className={item.key === "kick" ? "text-danger" : ""}
            onClick={() => handleEvent(item.event)}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
      </div>
    </Dropdown>
  );
}

import { Socket } from "socket.io-client";
import {  OptionsGroup } from "./memberList";


export interface ChProps{
  ch : Channel,
  socket : Socket
}
export const GroupHeader: FC<ChProps> = ({ ch, socket }) => {
  return (
    <div className="flex space-x-1">
     
      <div className="flex flex-col">
        <div className="text-white">{ch?.name}</div>
      </div>
      <OptionsGroup ch={ ch } socket={socket}/> <GroupSeting chId={ch?.id} socket={socket} />
    </div>
  );
};





  