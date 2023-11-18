"use client";
import Link from "next/link";
import React from "react";
import MyDrawer from "./MyDrawer";
import { Avatar } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { useRouter } from 'next/navigation'
import useSWR from "swr";
import { fetcher } from "@/app/(app)/profile/page";
import axios from 'axios';

const NavItems = [
  { pages: "Home", link: "/" },
  { pages: "Chat", link: "/chat" },
  { pages: "Game", link: "/game" },
  { pages: "Achievement", link: "/achievement" },
  { pages: "Rank", link: "/rank" },
];

 const Nav = () => {
  const router = useRouter();
  const isUserAuthenticated: boolean = true;
  return (
    <div className="navbar">
      <div className="navbar-start">
        <img className="w-10 h-10" src="/images/ping-pong.png" />
      </div>

      <div className="navbar-center gap-2 hidden lg:flex">
        {NavItems.map((data, index) => (
          <Link key={index} href={data.link} className="btn btn-ghost"   >
            {data.pages}
          </Link>
        ))}
        {/* <RecuistFrind /> */}
      </div>
      <div className="navbar-end">
        {isUserAuthenticated ? (
          <Menu>
            <MenuHandler>
              <Button className="flex place-items-center" variant="text">
                <Avatar src="/images/user.png" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>
              <Link href="/profile "  rel="preload" >profile</Link>
              </MenuItem>
              <MenuItem onClick={() => router.push('http://localhost:3001/api/auth/logout')}>Log out</MenuItem>
              <MenuItem>
                <Link href="/settings"  rel="preload">settings</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button>Login</Button>
        )}
      </div>
      <div className="navbar-end lg:hidden">
        <MyDrawer />
      </div>
    </div>
  );
};

export default Nav;
