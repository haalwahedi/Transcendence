"use client";
import { Channel, User } from "../../../../types/types";
import React, { FC } from 'react'
import {Avatar} from "react-daisyui";

interface userProps{
    user : User | undefined
  }

export const ChatHeader: FC<userProps> = ({user}) => {
    return (
      <div className="flex space-x-1">
        <Avatar
          src={user?.avatar}
          className=""
          size={"xs"}
          shape="circle"
        />
        <div className="flex flex-col">
          <div >{user?.userName}</div>
          <div className=" text-xs">{user?.status}</div>
        </div>
      </div>
    );
  };
