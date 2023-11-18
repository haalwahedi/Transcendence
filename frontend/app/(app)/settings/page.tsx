"use client";

import { Avatar } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { ChangeUsername } from "./chaneUsername";
// import {PrivatePage} from "./chaneUsername"

import Nav from "@/components/Nav";
{
  /* <Nav /> */
}

export default function Example() {
  return (
    <div className=" flex flex-col justify-center place-items-center max-h-screen">
      <Avatar
        className="ring-4   ring-green-500/30 border ring-black shadow-xl shadow-green-900/20"
        size="xxl"
        alt="avatar"
        src="/images/user.png"
      />
      <div className="flex flex-col mt-10 justify-center mr-16">
        <div>user:</div>
      </div>
      {/* <Nav /> */}
      <div className="mt-9 ">
        <ChangeUsername />
      </div>
      <div className="mt-9">
        <div className="mt-4 flex text-sm">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-light-blue-700 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </div>
      </div>
      <div className="mt-3">
        <Button>two-factor authentication</Button>
      </div>
    </div>
  );
}
