'use client'
import React from 'react'
import { Input } from '@material-tailwind/react'

const page = () => {
  return (
	<div className='flex flex-col justify-center gap-10 place-items-center p-96'>
		<div className='text-6xl font-bold'>Set your user name</div>
		<div className='flex justify-center max-w-xl'>
			<Input className='' label='enter your username' />
		</div>
	</div>
  )
}

export default page