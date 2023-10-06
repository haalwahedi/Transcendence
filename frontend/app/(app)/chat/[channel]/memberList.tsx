  
  import { Avatar } from "react-daisyui";
import { Socket } from "socket.io-client";
import { ChProps, ChatOp } from "./GroupHeader";
import { User } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import React from "react";


export const OptionsGroup : FC<ChProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = useState<User[]>(props.ch?.members);
  const handleOpen = () => setOpen(!open);
 
    useEffect(() => {
    props.socket.on("updateMembers", (updatedMembers : User[]) => {
        console.log("Received updateMembers event:", updatedMembers);
        setMembers( [...updatedMembers]);

    } )
  }, [props.socket])
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        :
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Group members</DialogHeader>
        <DialogBody divider>
        <div className='overflow-y-scroll h-64'> {/* Set a fixed height */}
      {members?.map((data: User) => (
        <div
          className="flex justify-between items-center border-b py-2"
          key={data.id}
        >
          <div className="flex gap-2">
            <Avatar src={data.avatar} className="w-12 h-12" />
            <div className="flex flex-col">
              <div className="font-bold text-black">{data.userName}</div>
              <ChatOp chId={props.ch.id} socket={props.socket} member={data.id}/>
            </div>
          </div>
        </div>
      ))}
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>ok</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
