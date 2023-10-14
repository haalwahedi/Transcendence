"use client"
import {
	Card,
	CardBody,
	Button,
  } from "@material-tailwind/react";
import { useRouter } from 'next/navigation'

   
  
  export default function SignInCard() {
	const router = useRouter();

	return (
	  <Card className="w-96">
		<CardBody className="flex flex-col gap-4">
			<Button color="orange" onClick={() => router.push('http://localhost:3001/api/auth/login')}>
				Sign in with 42
			</Button>
		</CardBody>
	  </Card>
	);
  }