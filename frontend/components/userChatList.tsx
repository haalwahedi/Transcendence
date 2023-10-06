"use client"

import React, { useState } from 'react'
import styles from "@/styles/chat.module.css"
import SearchInput from './seachInput'
import { Tabs } from 'react-daisyui'
import UserList from './userList'
import GroupChatList from './groupChatList'


const { Tab } = Tabs

function UserChatList() {
  const [tabValue, setTabValue] = useState<number>(0)
  return (
    <div className="bg-gray-700 p-3">
      <SearchInput />
      <Tabs variant="bordered" size="lg" value={tabValue} onChange={setTabValue} className='mb-3'>
        <Tab value={0}> Frends</Tab>
        <Tab value={1}>Group</Tab>
      </Tabs>

      {tabValue === 0 ? (<UserList />) : (<GroupChatList />)}
    </div>
  )
}

export default UserChatList