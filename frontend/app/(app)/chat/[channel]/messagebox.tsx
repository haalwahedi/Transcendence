"use client";
import React, { useState, useEffect, FC } from 'react';
import { Textarea, Button, IconButton } from '@material-tailwind/react';
import {Channel, PropsSocket} from "../../../../types/types"


import { useParams } from 'next/navigation';
import { Socket } from 'socket.io-client';

interface ChannelProps {
  socket : Socket,
  ch: Channel,
}

export const MessageBox : FC<ChannelProps> = ({socket, ch}) => {
  const [message, setMessage] = useState('');
  // const params = useParams();
  const handleSendMessage = () => {
    if (message && socket) {
      socket.emit('SendMessage', { text:message, channel_id: ch.id });
      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-blue-gray-500/20 bg-blue-500/10 p-2">
      <Textarea
        value={message}
        rows={1}
        resize={true}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
        className="min-h-full !border-0 focus:border-transparent"
        containerProps={{
          className: "grid h-full",
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div>
        <IconButton variant="text" className="rounded-full" onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
