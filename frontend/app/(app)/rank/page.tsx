"use client";
import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { useRouter } from "next/router";
// import { useAuth } from "src/auth/useAuth";
import useSWR from 'swr';
import {fetcher} from "../profile/page";

import { Card, Typography } from "@material-tailwind/react";
import {User} from '../../../types/types'
 
const TABLE_HEAD = ["Name", "rank", "", ""];
 

export default function DefaultTable() {
  const { data: TABLE_ROWS , error, isLoading } = useSWR('http://localhost:3001/api/user/rank', fetcher)
  if ( isLoading)
    return <div>loading...</div>
  return (
    <Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head,index) => (
              <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS?.map((user : User, index : number) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={user.userName}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {user.userName}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {user.rank}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}