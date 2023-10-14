"use client";

import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export  const socket = io('http://localhost:3001/chat',{ transports: ['websocket'] });
const ChatPage = () => {

  // useEffect(() => {
     
  //   return () => {
  //         // Clean up the socket connection when the component unmounts
  //         if (socket) {
  //           socket.disconnect();
  //           // socket = null;
  //         }
  //       };

  // },[])
  return (
    <>
    </>
  );
};

export default ChatPage;
