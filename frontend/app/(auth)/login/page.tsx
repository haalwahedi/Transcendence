'use client'
import React from 'react'
import { Button } from '@material-tailwind/react'
import SignInCard from '@/components/SignInCard'

const page = () => {
  return (
	<div className='flex justify-center gap-20 place-items-center p-96 flex-col'>
		<div>
			<div className='flex mt-10 flex-row gap-3 place-items-center'>
			<img className='w-10 h-10 ' src="/images/ping-pong.png" />
				<div className='text-5xl font-bold '>
					It's time for a ping pong game
				</div>
				<img className='w-10 h-10 mt-2' src="/images/ping-pong.png" />
			</div>
		</div>
		<SignInCard />
	</div>
  )
}

export default page