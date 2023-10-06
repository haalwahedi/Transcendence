'use client'
import React, { FC } from 'react';
import { useState , useEffect } from 'react';

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
  } from "@material-tailwind/react";

// import {socket} from "./page"
import io, { Socket } from 'socket.io-client';
interface Props{
  socket : Socket
}

export const Creatgroup: FC<Props> = ({socket}) => {
  
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('private'); // Default group type
  const [pass, setPass] = useState("");
  

  const handleCreateGroup = () => {
    if (groupName && socket) {
      socket.emit('CreateGroup', { name: groupName, type: groupType, pass: pass });
      setGroupName('');
      setPass(''); 
    }
  };

  return (
    <div >
    <Popover>
      <PopoverHandler >
        <Button color="blue-gray" className="flex text-md items-center justify-center opacity-50 w-8 h-9 rounded">+</Button>
      </PopoverHandler>

      <PopoverContent className="w-96 grid overflow-visible z-20">
        <div className="flex gap-3 flex-col gap-2">
          <Input label="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          <div className='flex flex-row gap-2 text-color-black'>
          <span>Group Type:</span>
          <select
            id="type"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
          >
            <option value="private">private</option>
            <option value="public">public</option>
            <option value="protected">protected</option>
          </select>
          </div>
          {
            groupType == "protected"? ( <Input label="Password" value={pass} onChange={(e) => setPass(e.target.value)} />): null
            
          }
      
      <Button variant="gradient" onClick={handleCreateGroup}>
            Create
          </Button>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}
