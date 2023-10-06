"use client";
import  { useState, useEffect, FC } from 'react';
import {ChannelProps} from "./GroupHeader"

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
    } from "@material-tailwind/react";

export const AddToChannel: FC<ChannelProps> = ({ chId, socket}) =>  {
 
    const [user, setuser] = useState('');
  
    const handleAddUser = () => {
      if (user && socket) {
        socket.emit('AddUser', { userName: user, chId : chId});
        setuser(''); // Clear the input after emitting
      }
    };
  
    return (
      <Popover placement="bottom">
        <PopoverHandler>
          <Button>Add user</Button>
        </PopoverHandler>
  
        <PopoverContent className="w-96">
          <Typography variant="h6" color="blue-gray" className="mb-6">
            add user
          </Typography>
          <div className="flex gap-2">
            <Input label="add user" type="text" value={user} onChange={(e) => setuser(e.target.value)} />
            <Button variant="gradient" onClick={handleAddUser} disabled={!user}>
              add
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  