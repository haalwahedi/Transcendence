"use client";
import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";


import Link from "next/link";
const navitms = [
  { page: "home", link: "/" },
  { page: "chat", link: "/chat" },
  { page: "game", link: "/game" },
  { page: "rank", link: "/rank" },];

export default function MyDrawer() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="">
          {navitms.map((data, index) => (
            <Link href={data.link} key={index}   >
              <div className="btn btn-ghost flex flex-col">{data.page}</div>
            </Link>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
}
