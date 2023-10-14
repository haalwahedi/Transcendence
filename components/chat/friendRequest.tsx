'use client'
import React, { FC } from 'react';
import { useState , useEffect } from 'react';
import {BiUser} from  'react-icons/bi';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Dialog,
   Badge,
   IconButton,
   Avatar
  } from "@material-tailwind/react";
// import {Badge} from "@nextui-org/react";
// import {socket} from "./page"
import io, { Socket } from 'socket.io-client';
import { User } from '@/types/types';
interface Props{
  socket : Socket
}


interface FriendShip{
  id : number,
  user1 : User,
  user2 : User,
}
export const FriendRequest: FC<Props> = ({socket}) => {
  
  const [open, setOpen] = React.useState(false);
  const [friends, setFriends] = useState<FriendShip[]>([]);
  const [isLoading, setLodaing] = useState(true)

 
  const handleOpen = () => setOpen(!open);

  const reject = (id : number) => {

    socket.emit("rejectFriend",  id)
  }

   const accept = (id : number) => {
    
    socket.emit("acceptFriend",  id)
  }
  useEffect(() =>{
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/api/user/friendsReq", { credentials: 'include' });
        const res = await response.json();
        setFriends(res);
        setLodaing(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  fetchData();
  }, [])

  useEffect(() => {
    socket.on("friendReq", (req : FriendShip[]) =>{
      console.log(req);
        setFriends([...req])
    })
  }, [socket])
 
  if (isLoading)
    return <div> loding ... </div>

  return (
     <>
      <Badge content={friends?.length}  className="absolute top-2 justify-center inline-flex w-2 h-2 border-2 border-white border-opacity-25 rounded-full" >
        <BiUser onClick={handleOpen} className="w-9 h-9 cursor-pointer hover:drop-shadow-md"/>
      </Badge>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Friend Requests</DialogHeader>
        <DialogBody divider>
           <div className='overflow-y-scroll h-64'> 
           {
  Array.isArray(friends) ? (
    friends.map((data: FriendShip) => {
      return (
        <div
          className="flex justify-between items-center border-b py-2"
          key={data.id}
        >
          <div className="flex gap-2">
            <Avatar src={data.user1?.avatar} className="w-12 h-12" />
            <div className="flex flex-col">
              <div className="font-bold text-black">{data.user1?.userName}</div>
            </div>
          </div>
          <div className='flex gap-4'>
            <Button variant="gradient" color="green" onClick={() => accept(data.id)}>
              <span>Accept</span>
            </Button>
            <Button variant="gradient" color="red" onClick={() => reject(data.id)}>
              <span>Decline</span>
            </Button>
          </div>
        </div>
      );
    })
  ) : (
    // Handle the case when friends is not an array (e.g., show a message or render null)
    <p>Friends is not an array</p>
  )
}

    </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
