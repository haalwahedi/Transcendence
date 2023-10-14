"use client";


import React, { FC, useState } from 'react'
import { Button, Input } from "react-daisyui"
import { Form, InputGroup } from 'react-daisyui'

interface MessageInputProps {
  className?: string
}

const MessageInput: FC<MessageInputProps> = ({ className }) => {
  // const [text, setText] = useState<string>('')
  return (
    <Form className={`${className}`}>
      <InputGroup className='' >
        <Input className='w-[90%]' type="text" placeholder="write the massge" bordered />
        <Button className=''>send</Button>
      </InputGroup>
    </Form> 
  )
}

export default MessageInput