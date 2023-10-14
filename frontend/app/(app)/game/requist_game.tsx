import { useState, useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { socket } from '../../../components/chat/creatgroup';

export function DialogDefault() {
  const [open, setOpen] = useState(false);
  const [gameRequestData, setGameRequestData] = useState(null); // To store received parameters

  // Add a Socket.IO event listener to handle 'requestGame' event
  useEffect(() => {
    const handleGameRequest = (data) => {
      // When 'requestGame' event is received, store the data in gameRequestData
      setGameRequestData(data);

      // Automatically open the dialog when a game request is received
      setOpen(true);
    };

    socket.on('requestGame', handleGameRequest);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('requestGame', handleGameRequest);
    };
  }, []);

  // Render the component conditionally based on whether a request has been received
  if (!gameRequestData) {
    return null; // Don't render anything if no request has been received
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        invite to play
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Game Request</DialogHeader>
        <DialogBody divider>
          {/* Display the received data in the dialog */}
          {gameRequestData && (
            <div>
              <p>{`Received game request from: ${gameRequestData.sender}`}</p>
              {/* Add more details from gameRequestData as needed */}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
