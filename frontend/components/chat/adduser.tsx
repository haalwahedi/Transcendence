"use client";

import React, { useState, useEffect, FC } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Socket } from "socket.io-client";

interface Props{
  socket : Socket
}

export const AddUser: FC<Props> = ({socket}) => {

  const [user, setUser] = useState(""); 


  const handleAddFriend = () => {
    if (user) {
      socket.emit('AddFriend',  user);
      setUser('');
    }
  };

  return (
    <div className="relative flex w-full max-w-[24rem]">
      <Input
        type="text" 
        label="Add user" 
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />

      <Button
        size="sm"
        color={user ? "blue" : "blue-gray"}
        className="!absolute right-1 top-1 rounded"
        onClick={handleAddFriend}
        disabled={!user}
      >
        Invite
      </Button>
    </div>
  );
}