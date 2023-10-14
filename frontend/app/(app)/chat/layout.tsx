"use client"
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge, Avatar, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Providers from "../providers";
import {AddUser} from "../../../components/chat/adduser";
import {Creatgroup} from "../../../components/chat/creatgroup";
import List_Op from "../../../components/chat/list_op";
import {fetcher} from "../profile/page";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import {Channel, User} from '../../../types/types'
// import { socket } from "./page";
import { AlertMessage } from "@/components/alert";
import { Socket, io } from "socket.io-client";
import { socket } from "./page";
const Headers = [{ name: "Friends" }, { name: "Groups" }];
// export let  socket : Socket;
import {Divider} from "@nextui-org/react";
import { FriendRequest } from "@/components/chat/friendRequest";

// const isauth = async () =>{
//   try{
//         const res = await fetch('http://localhost:3001/api/user/rank', {
//                       credentials: 'include',});
//           // const resdata = await res.json();
//           console.log("gg " + res.status);
//           if (res.status === 401)
//             console.log("unauth");
//           else
//             console.log("auth");
//         }catch(e){
//           console.log(e);
//         }
// }
export default function ChatLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter();
    const {data: me, error: meerr, isLoading: meloading} = useSWR("http://localhost:3001/api/user/me", fetcher,)
    const [Groups, setGroups] = useState<Channel[]>([]);
    const [Direct, setDirect] = useState<Channel[]>([]);
    const [Lodaing, setLodaing] = useState(true);

    const auth =true ;
    if(!auth)
      router.push("/login");
    useEffect(() => {
     
      fetch("http://localhost:3001/api/chat/friends", {credentials: 'include'}).then((res) => res.json()).then((direct)=>  setDirect(direct))
      fetch("http://localhost:3001/api/chat/Groups", {credentials: 'include'}).then((res) => res.json()).then((groups)=>  setGroups(groups))
  

    },[])
    
    useEffect(() => {

      socket.on("updateGroups", (ch : Channel)=>{
        if (ch.type === "direct")
          {
            console.log("direct group")
            setDirect((prev)=> [...prev, ch]);
          }
        else
        {
          console.log(ch)
          setGroups((prev)=> [...prev, ch]);
        }
      })
    }, [socket])

    if ( meloading)
      return <div>loading...</div>

  // if (data)
    // return <div> {data.map((item:any) => <div>{item.type} </div>)}</div>
    return (
      <div>
        <AlertMessage socket={socket} />
        <div className="grid h-screen grid-cols-3 gap-x-1 ">
          <div className=" pt-5 shadow-md pt-5 ml-4  mb-10 mt-5 bg-gray-200/50">
            
              <Tabs value="Friends">
              <TabsHeader className="flex flex-col ml-2  items-center gap-3 bg-transparent">
              <div className="flex gap-4 items-center">
                <AddUser socket={socket}/>
                <Creatgroup socket={socket}/>
                <FriendRequest socket={socket} />
                </div>
                <div className="flex">
                {
                  Headers.map((tab, index) => (
                  <Tab key={index} className="w-32" value={tab.name}>
                    {tab.name}
                  </Tab>
                  ))
                }
                </div>
              </TabsHeader>
                 <TabsBody className="mt-0 h-[calc(100vh-10rem)]  overflow-auto">
                {
                Headers.map((tabs, index) => (
                  <TabPanel value={tabs.name} key={index}>
                    {
                      tabs.name === "Friends" ? (
              <>
       {Array.isArray(Direct) ? (
          Direct.map((data: Channel, index) => {
            const user = data.members.filter((user) => user.id !== me.id)[0];
            return (
              <div
                className="flex relative w-full justify-between"
                key={index}
                onClick={() => router.push(`http://localhost:3000/chat/${data.id}`)}
              >
                <div className="flex flex-row gap-2 m-2">
                  <Badge placement='bottom-end' color={user.status === "online" ? "green" : "red"} className="absolute top-6 inline-flex  w-4 h-4 border-2 border-white rounded-full">
                    <Avatar src={user.avatar} className="w-12 h-12" />
                  </Badge>
                  <div className="flex flex-col">
                    <div className="font-bold mt-2 text-black">
                      {user.userName}
                    </div>
                    <List_Op id={user.id}/>
                  </div>
                </div>
                <div className="flex flex-row gap-1 place-items-center">
                  {true ? (
                    <BellIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <div>
                      <CheckIcon className="w-5 h-5" />{" "}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : null}

                <Divider className="my-4 color-black" />
              </>
            )  : tabs.name === "Groups" ? (
            < >

{
  Array.isArray(Groups) ? (
    Groups.map((data: Channel, index) => (
      <div
        className="flex justify-between"
        key={index}
        onClick={() => router.push(`http://localhost:3000/chat/${data.id}`)}
      >
        <div className="flex flex-row gap-2 m-2">
          <Avatar src="https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png" className="w-12 h-12" />
          <div className="flex flex-col">
            <div className="font-bold text-black">
              {data.name}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-1 place-items-center">
          {true ? (
            <BellIcon className="w-5 h-5 text-red-500" />
          ) : (
            <div>
              <CheckIcon className="w-5 h-5" />{" "}
            </div>
          )}
        </div>
      </div>
    ))
  ) : null
}

  
            </>
          ) : null
          }
        </TabPanel>
      ))}
    </TabsBody>

  </Tabs>
            </div>
            {children}
        </div>
       </div>
    );
  }
