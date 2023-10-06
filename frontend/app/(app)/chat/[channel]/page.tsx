"use client";

import { GroupHeader} from "./GroupHeader";
import {ChatHeader} from "./ChatHeader"
import {MessageBox} from "./messagebox";
import { Avatar,  ChatBubble } from "react-daisyui";
import { Button, Input } from "@material-tailwind/react";
import { Socket, io } from "socket.io-client";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Console } from "console";
import { useParams } from "next/navigation";
import { RemovePassword , GroupSeting} from "./remove";
import  {format} from "date-fns";
import {fetcher} from "../../profile/page";
import {User, MessageType, Channel} from "../../../../types/types"
import { FC, useEffect, useRef, useState } from "react";
import {PropsSocket} from "../../../../types/types"
import { socket } from "../page";

// const socket = io("http://localhost:3002");
const setTime = (time : number)=>{
  return format(new Date(), 'HH:mm')
}

function getFriend(members : User[], me : User) {
  return members.find((user) => user.id !== me.id);
}

const ChatPage = () => {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const [messList , setMessList] = useState<MessageType[]>([]);
  const [correctPass, setCorrectPass] = useState(false);
   const [pass, setPass] = useState("");
  const { data : channelData, error: channelError, isLoading : channelLoading } =  useSWR(`http://localhost:3001/api/chat/channel/${params?.channel}`, fetcher);
  const { data, error, isLoading } = useSWR('http://localhost:3001/api/user/me', fetcher)
  
  
  useEffect(() => {
    
    fetch(`http://localhost:3001/api/chat/channel/${params?.channel}`, {credentials: 'include',})
      .then((res) => res.json())
      .then((data) => {
        setMessList(data.message);
        socket.emit('JoinRoom', {chId : params?.channel})
      });
      
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messList]);

  // Function to scroll to the bottom of the messages container
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const handelPass = () => {
    socket.emit("checkPass", {pass, chId: channelData.id});
    setPass("");
  }

  useEffect(() =>{

    socket.on("checkPass", (isCorrect : any) => 
    {
      setCorrectPass(isCorrect.pass)
    })
  
    socket.on("newMessage", (mess : any) => 
    {
      setMessList((messLisPrev) => [...messLisPrev, mess])}
      )
  }, [socket])

  if (channelLoading || isLoading)
    return <div>loading...</div>

  if (channelData?.type == "protected" && !correctPass)
  {
    return(
  
  <div className=" flex w-full max-w-[70rem] items-center">
    <div className="relative  ml-[14rem] ">
      <Input
        type="Pasword"
        label="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        // className="pr-20"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        className="!absolute right-1 top-1 rounded"
        onClick={handelPass}
      >
        Submit
      </Button>
    </div>
    </div>

    )
  }
    
  return (
    <div className=" shadow-md bg-gray-200 ml-0  col-span-2 rounded-md mr-4 shadow-md mb-10 border-2 border-gray-500 m-5">
      <div className=" flex-col flex h-full">
        <div className="flex flex-row text-black items-center gap-4 h-20 bg-blue-500/10 z-10 px-[4rem]">
          {
            channelData?.type == "direct" ? 
            (<ChatHeader user={getFriend(channelData.members, data)} />): 
            (<GroupHeader ch={channelData} socket={socket}/>)
          }
        </div>
          <div className="relative px-4 py-20 w-full h-[calc(100vh-15rem)]   overflow-auto" ref={messagesRef}>
          {
            messList?.map((mess : MessageType , index : number) => (
            <div  key={index} className="flex flex-col gap-2 px-2">
              {
                mess.sender.id == data.id?(
                        <ChatBubble end className="grid-cols-1 ml-auto">
                  <ChatBubble.Header className="flex  flex-col">
                  {mess.sender.userName} <ChatBubble.Time>{mess.createdAt}</ChatBubble.Time>
                    <div className="flex flex-row-reverse">
                      <ChatBubble.Avatar src={mess.sender.avatar} />
                      <ChatBubble.Message>{mess.text}</ChatBubble.Message>
                    </div>
                  </ChatBubble.Header>
                </ChatBubble> 
              ):(
              <ChatBubble className="grid-cols-1">
                <ChatBubble.Header className="flex  flex-col">
                  {mess.sender.userName} <ChatBubble.Time>{setTime(mess.createdAt)}</ChatBubble.Time>
                  <div className="flex flex-row">
                    <ChatBubble.Avatar src={mess.sender.avatar} />
                    <ChatBubble.Message color="secondary" >
                      {mess.text}
                    </ChatBubble.Message>
                  </div>
                </ChatBubble.Header>
              </ChatBubble>)}
            
          </div>
        ))}
        </div>
          <div className="flex w-full justify-center items-center right-0 left-0 gap-2">
            <div className="flex items-center w-full max-w-lg mb-5  ">
              <MessageBox socket={socket} ch={channelData}/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ChatPage;
