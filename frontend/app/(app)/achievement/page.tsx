
"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { link } from "fs";
import Nav from "@/components/Nav";


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

const page = () => {
  return (
    <div className="flex gap-2 justify-center ">
      {/* <Nav /> */}
      {AchievementCard.map((data, index) => (
        <Card className="mt-6 w-96" key={index}>
          <CardHeader color="blue-gray" className="">
            <img
              className="object-cover  justify-center place-items-center"
              src={data.img}
            />
          </CardHeader>

          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {data.title}
            </Typography>
            <Typography>{data.body}</Typography>
          </CardBody>

          <CardFooter className="pt-0">Abdu Rahman</CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default page;
