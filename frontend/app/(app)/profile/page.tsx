"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@material-tailwind/react";
// Correct import for a default export
import { Button } from "@material-tailwind/react";
import Nav from "@/components/Nav";
import {User} from '../../../types/types'
{
  /* <Nav /> */
}
import useSWR from 'swr';
// import page from "../achievement/page";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { link } from "fs";
import { date } from "zod";
import { stringify } from "querystring";
import MyLoding from "@/components/loding";

const AchievementCard = [
  {
    img: "/images/gtrophy.png",
    title: "win firest game",
    body: "you win your first game",
  },
  {
    img: "/images/grayTrophy.png",
    title: "populer",
    body: "you shoud have friends",
  },
  {
    img: "/images/grayTrophy.png",
    title: "best player ",
    body: "win 10 games",
  },
];

const hostary = [
  { title: "win", body: "7 vs 5", nameplyer: "ahmed" },
  { title: "lose", body: "1 vs 2", nameplyer: "omar" },
  { title: "win", body: "4 vs 1", nameplyer: "ali" },
];
//step 1
export const fetcher = async (args : string) => {
  const response = await fetch(args, {
    method: 'GET',
    credentials: 'include',})
  const data = await response.json();
  return data;
}
export default function Example() {
  const [width, setWidth] = React.useState(0);
  // const [data, setData] = useState<User | null>(null);
  const carousel = React.useRef<HTMLDivElement>(null);

 
  React.useEffect( () => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    // (
    //   async () => {
    //     try{
    //       const res = await fetch('http://localhost:3001/api/auth/status', {
    //                   method: 'GET',
    //                   credentials: 'include',});
    //       const resdata = await res.json();
    //       if (res.status === 401)
    //         console.log("unauth");
    //       else
    //         console.log("auth");
    //     }catch(e){
    //       console.log("unauth");
    //     }
    //   }
    // )()
  }, []);

  const { data, error, isLoading } = useSWR('http://localhost:3001/api/user/me', fetcher) //step 2
  if (error)
    return <div>error fetching data </div>
  if (isLoading)
    return <MyLoding />

  return (
    <div className=" flex flex-col justify-center place-items-center max-h-screen">
      <Avatar
        className="ring-4   ring-green-500/30 border ring-black shadow-xl shadow-green-900/20"
        size="xxl"
        alt="avatar"
        src={data ? data.avatar : "loading..."}
      />

      <div>
        {data?.status == "online" ? (
          <Button className="mt-3" disabled color="green">
            online
          </Button>
        ) : data?.status == "offline" ? (
          <Button className="mt-3" disabled color="red">
            offline
          </Button>
        ) : (
          <Button className="mt-3" disabled color="green">
            in game
          </Button>
        )}
      </div>
      
      <div className="flex flex-row mt-6 gap-9 justify-center mr-16">
        <div>name: {data ? data.userName : ""}</div>
       
        <div>rank: {data ? data.rank : "  "}</div>
        <div>win: {data ? data.win : ""}</div>
          <div>lose: {data ? data.lose : ""}</div>
      </div>

      <motion.div
        ref={carousel}
        className="cursor-grab  fixed-left overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex max-w-[31rem]  gap-1 "
        >
          {hostary.map((data, index) => (
            <div className="flex  min-w-max" key={index}>
              <Card className="max-w-[15rem]">
                <CardHeader color="blue-gray" className="mt-7">
                  <img
                    className="object-cover   justify-center place-items-center"
                    src={
                      data.title === "win"
                        ? "/images/gtrophy.png"
                        : "/images/grayTrophy.png"
                    }
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h4" color="blue-gray" className="">
                    {data.title}
                  </Typography>
                  <Typography>{data.body}</Typography>
                  <Typography>{data.nameplyer}</Typography>
                </CardBody>

                {/* <CardFooter className="pt-0"></CardFooter> */}
              </Card>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="flex flex-col gap-2 md:fixed left-5 mt-11">
        {/* <Nav /> */}
        {AchievementCard.map((data, index) => (
          <Popover key={index}>
            <PopoverHandler>
              <Button>{data.title}</Button>
            </PopoverHandler>
            <PopoverContent className="z-[999] flex w-[28rem] overflow-hidden p-0">
              <div className="p-4">
                <Typography color="blue-gray" className="mb-2 font-medium">
                  {data.title}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="mb-4 font-normal"
                >
                  {data.body}
                </Typography>
              </div>
              <img
                src={data.img}
                alt="image"
                className="h-full w-1/2 object-cover"
              />
            </PopoverContent>
          </Popover>
          
          ))}
    
      </div>

      <div>{/* {</page>} */}</div>
    </div>
  );
}
