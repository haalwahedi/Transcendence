"use client";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    IconButton,
  } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
  
   
interface props{
  id : number
}

  export function List_Op({id} : props) {
    const router = useRouter();
    console.log(id)
    const handelPro = (event : any) => {
      event.preventDefault();
      router.push("/1")
    }
    return (
      <Menu>
        <MenuHandler>
          <IconButton  className="w-2 h-2">.</IconButton >
        </MenuHandler>
        <MenuList>
          <MenuItem>Invite to game</MenuItem>
          <MenuItem>Block</MenuItem>
         
          <MenuItem onClick={handelPro}>Profile</MenuItem>
        </MenuList>
      </Menu>
    );
  }


  export default List_Op;