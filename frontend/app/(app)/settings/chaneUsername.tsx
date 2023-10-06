'use client'
// import React from 'react';
// import { useState } from 'react';


// // Rest of your code...
// import Image from 'next/image';

// import { Select } from "react-daisyui";
// import { Badge } from "react-daisyui";
// import { Indicator } from "react-daisyui";
// import { Join } from "react-daisyui";

// import {
//     Popover,
//     PopoverHandler,
//     PopoverContent,
//     Button,
//     Input,
//     Typography,
//   } from "@material-tailwind/react";
   


//   export function ChangeUsername() {
//     return (
//       <Popover placement="bottom">
//         <PopoverHandler>
//           <Button>chaneUsername</Button>
//         </PopoverHandler>
 

//         <PopoverContent className="w-96">
//           <Typography variant="h6" color="blue-gray" className="mb-6">
        
//           </Typography>
//           <div className="flex gap-2">
//             <Input label="user name" />
//             <Button variant="gradient">  user NAme changed  </Button>
//           </div>
//         </PopoverContent>
        
//       </Popover>
//     );
//   }



  
        // <div className="absolute inset-y-0 right-0 flex items-center">
        //   <label htmlFor="currency" className="sr-only">
        //     Currency
        //   </label>
        //   <select
        //     id="currency"
        //     name="currency"
        //     className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        //   >
        //     <option>private</option>
        //     <option>public</option>
        //     <option>protect</option>
        //   </select>
        // </div>







        //////////////////////////////

        import React, { useState, useEffect, FC } from 'react';
        import { Popover, PopoverHandler, PopoverContent, Button, Input, Typography } from '@material-tailwind/react';
        import io, { Socket } from 'socket.io-client';
        

        interface Props{
          socket : Socket
        }
        export const ChangeUsername : FC<Props> = ({socket}) => {
          const [newUsername, setNewUsername] = useState('');
        
          const handleChangeUsername = () => {
            if (newUsername && socket) {
              socket.emit('ChangeUsername', { username: newUsername });
              setNewUsername(''); // Clear the input after emitting
            }
          };
        
    
        
          return (
            <Popover placement="bottom">
              <PopoverHandler>
                <Button>Change Username</Button>
              </PopoverHandler>
        
              <PopoverContent className="w-96">
                <Typography variant="h6" color="blue-gray" className="mb-6">
                  Change Username
                </Typography>
                <div className="flex gap-2">
                  
                  <Input label="New Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                  <Button variant="gradient" onClick={handleChangeUsername}>
                    Change Username
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          );
        }
        