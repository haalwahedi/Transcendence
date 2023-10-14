"use client";
import React, { useState, useEffect, FC } from 'react';
import { Button, Input, Popover, PopoverContent, PopoverHandler, Typography } from '@material-tailwind/react';
import io, { Socket } from 'socket.io-client';
import {ChannelProps} from "./GroupHeader"
import { AddToChannel } from './add_to_channel';

export const RemovePassword : FC<ChannelProps> = (props) => {
  const handleRemovePassword = () => {
    if (props.socket) {
      props.socket.emit('RemovePassword', { chId: props.chId});
    }
  };

  return (
    <Button color="blue-gray" onClick={handleRemovePassword}>
      remove Password
    </Button>
  );
}

export const SetPassword: FC<ChannelProps> = (props) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSetPassword = () => {
    if (newPassword && props.socket) {
      props.socket.emit('SetPassword', { password: newPassword, chId: props.chId});
      setNewPassword(''); // Clear the input after emitting
    }
  };

  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button>Set Password</Button>
      </PopoverHandler>

      <PopoverContent className="w-96">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Set Password
        </Typography>
        <div className="flex gap-2">
          <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Button variant="gradient" onClick={handleSetPassword} disabled={!newPassword} >
            Set
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const GroupSeting: FC<ChannelProps> = ({ chId, socket }) => {
 
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Button>Group seting</Button>
      </PopoverHandler>

      <PopoverContent className="w-48 flex  flex-col gap-2">
      <RemovePassword chId={chId} socket={socket} />
      <SetPassword chId={chId} socket={socket} />
      <AddToChannel chId={chId} socket={socket} />
      </PopoverContent>
    </Popover>
  );
}