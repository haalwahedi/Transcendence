"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import Nav from "@/components/Nav";
import { User } from "../../../types/types";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { link } from "fs";
import { date } from "zod";
import { useParams } from "next/navigation";
import MyLodaing from "../../../components/loding"

const hostary = [
  { title: "win", body: "7 vs 5", nameplyer: "ahmed" },
  { title: "lose", body: "1 vs 2", nameplyer: "omar" },
  { title: "win", body: "4 vs 1", nameplyer: "ali" },
];

export default function Example() {
  const [width, setWidth] = React.useState(0);
  const [data, setData] = useState<User | null>(null);
  const carousel = React.useRef<HTMLDivElement>(null);


  const params = useParams();
  const uid = params?.id;
   //http://localhost:3001/api/user/all
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    fetch(`http://localhost:3001/api/user/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        // console.log(data);
      });
  }, []);

  if (!data)
    return (<MyLodaing/>);

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
            ofline
          </Button>
        ) : (
          <Button className="mt-3" disabled color="green">
            in game
          </Button>
        )}
      </div>
      {}
      <div className="flex flex-col mt-10 justify-center mr-16">
        <div>name: {data ? data.userName : "loading..."}</div>
        <div>rank: {data ? data.rank : ""}</div>
      </div>

      <motion.div ref={carousel} className="cursor-grab overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex max-w-[31rem] gap-1 "
        >
          {hostary.map((data, index) => (
            <div className="flex min-w-max" key={index}>
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
                  <Typography variant="h4" color="blue-gray" className="mb-2">
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
    </div>
  );
}
