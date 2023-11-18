"use client"
import { useEffect, useState } from "react"


// const check = async () => {
//     try {
//         const response = await fetch('http://localhost:3001/api/auth/status');
//         console.log("hhhh")
//         // If the request is successful, consider the user authenticated
//         return true;
//       } catch (error) {
//         // If the request throws an error, consider the user not authenticated
//         return false;
//       }
// }

export default function Test() {
    const [logged, setLogged] = useState(false);
  
    useEffect(() => {
      const check = async () => {
        // try {
          const response = await fetch('http://localhost:3001/api/auth/status', {
            credentials: 'include',
          });
  
          // Check if the response status code indicates success (e.g., 200 OK)
          if (response.ok) {
            setLogged(true);
          } else {
            setLogged(false);
          }
        // } catch (error) {
        //   // If the request throws an error, consider the user not authenticated
        //   setLoged(false);
        // }
      };
  
      check();
    }, []);
  
    if (!logged) {
      return <div>Not logged in</div>;
    }
  
    return <div>Logged in</div>;
  }