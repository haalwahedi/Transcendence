import React from 'react'
import { Avatar } from "react-daisyui"

const UserList = () => {
    return (
        <div className='space-y-4 mt-4'>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
        </div>
    )
}

const UserCard = () => {
    return (
        <div className="flex space-x-2">
            <Avatar src='https://i.pravatar.cc/300' className='' size={"xs"} shape='circle' />
            <div>
                <h1 className='text-sm'>Aura margaret</h1>
                <p className='text-xs'>how about yesterday's science.... </p>
            </div>
        </div>
    )
}

export default UserList