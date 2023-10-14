import { Button } from '@material-tailwind/react'
import React from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

const Home = () => {
  return (
    <div className='flex mt-5 place-items-center flex-col justify-center gap-3 p-10'>

        <div className='text-center text-3xl text-blue-600'>Welcome to the multiplayer online ping pong game</div>
        <img className='w-96 h-96' src="/images/table-tennis.svg" />
        <Link href="/game" as="game" rel="preload">
        <Button className='w-full'>
            Let's play
        </Button>
        </Link>
    </div>
  )
}

export default Home