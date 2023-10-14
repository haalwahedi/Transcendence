"use client"
// import Nav from '../../components/Nav';
import Nav from "@/components/Nav";
import React,{useEffect} from 'react'
import { io } from "socket.io-client";

const socket = io('http://localhost:3001/game');
const page = () => {

  useEffect(
    () => {
      // const socket = io('http://localhost:3001/game');
      let width: number = 700;
      let height: number = 600;
      let player_width: number = 20;
      let player_height: number = 100;
      let end_point: number = 5;
      const pi: number = Math.PI;
      const UP: number = 38;
      const DOWN: number = 40;

      let canvas: HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D;
      let keystate: any;
      let ball: any;
      let message: string = "";
      let score1: number = 0;
      let score2: number = 0;
      let won1: number = 0;
      let won2: number = 0;
      let level:number = 1;
      let username: string[] = [];

      let space_down: boolean = false;

      function listen(): void {
        document.addEventListener('keydown', function (key: KeyboardEvent) {
          socket.emit('keydown', key.keyCode);
          console.log(key.keyCode);
          if (key.keyCode == 32) {
            let space: number = 0;
            if (space_down == false) {
              space = 1;
              space_down = true;
            } else {
              space = 0;
            }
            socket.emit('space_event', space);
          }
        });

        document.addEventListener('keyup', function (key: KeyboardEvent) {
          socket.emit('keyup', key.keyCode);
          if (key.keyCode == 32) {
            space_down = false;
          }
        });
      }


      let players: player[] = [];
      class player {
        x: number;
        y: number;
        width: number;
        height: number;
        username: string;

        constructor(xpos: number = 0, ypos: number = 0) {
          this.x = xpos;
          this.y = ypos;
          this.width = 0;
          this.height = 0;
          this.username = "";
        }

        init(): void {
        }

        update(): void {
          this.width = player_width;
          this.height = player_height;
        }

        draw(): void {
          // console.log("player drawn")
          ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      };


      ball = {
        x: (width - player_width) / 2,
        y: (height - player_width) / 2,
        vel: {
          x: 8,
          y: 0
        },
        side: player_width,
        speed: 8,
        update: function (): void {
        },

        draw: function (): void {
          ctx.fillRect(this.x, this.y, this.side, this.side);
        }
      };


      function init(): void {
        ball.side = player_width;
        ball.x = (width - ball.side) / 2;
        ball.y = (height - ball.side) / 2;
        // console.log(player_width);
        ball.vel = {
          x: ball.speed,
          y: 0
        };
      }

      function update(): void {
        ball.update();
        for (let p in players) {
          players[p].update();
        }
      }

      function draw(): void {
        // console.log("Mein Draw hin")
        ctx.fillStyle = "#8c52ff"; // Change "#FFFFFF" to the color you want

        // Clear the canvas with the background color
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        ctx.fillStyle = "#fff";

        for (let p in players) {
          // console.log(players)
          players[p].draw();
          // console.log(p)
        }

        if (username[0] === undefined) {
          ctx.font = "30px Arial";
          ctx.fillText(
            "Waiting For another player to join......",
            width / 4,
            height / 2
          );
        }

        // Usernames : Todo : center usernames
        if (username[0] !== undefined) {
          ball.draw();

          var mid_width = 4;
          var x = (width - mid_width) * 0.5;
          var y = 0;
          var step = height / 20;

          // draw half line
          while (y < height) {
            ctx.fillRect(x, y + step * 0.25, mid_width, step * 0.5);
            y += step;
          }

          // Messages
          ctx.font = "30px Arial";
          ctx.fillText(message, 0, height - 50);
          // Scores
          ctx.font = "30px Arial";
          ctx.fillText("Level "+level.toString(),width/20,height/12)
          ctx.fillText("points :"+score1.toString(), width / 4, height / 5);
          ctx.fillText("points :"+score2.toString(), 3 * width / 4, height / 5);
          ctx.fillText("won :"+won1.toString(), width / 4, height/1.05);
          ctx.fillText("won :"+won2.toString(), 3 * width / 4, height/1.05 );
          ctx.font = "30px Arial";
          ctx.fillText(username[0], width / 4, height / 8);
          ctx.fillText(username[1], 3 * width / 4, height / 8);
        }

        ctx.restore();
      }


      function main(): void {
        socket.on('usernames', (usernames: string[]) => {
          username.push(usernames[0]);
          username.push(usernames[1]);
        });

        listen();
        canvas = document.getElementById("mango") as HTMLCanvasElement;
        ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const loop = (): void => {
          canvas.width = width;
          canvas.height = height;
          update();
          draw();
          window.requestAnimationFrame(loop);
        };
        window.requestAnimationFrame(loop);
      }


      main();

      socket.on('config', (config: any) => {
        width = 700;
        height = 600;
        player_width = 20;
        player_height = 100;
        end_point = 5;
        init();
      })

      socket.on('game_over', (msg: string) => {
        // let message: string = msg;
        // Create the button
        console.log(msg)
        let leave_button: HTMLButtonElement = document.createElement("button");
        alert(msg)


        window.location.href = '/';

        // Append somewhere
        let body: HTMLBodyElement = document.getElementsByTagName("body")[0];
        body.appendChild(leave_button);

        // Add event handler
        leave_button.addEventListener("click", function () {
          
        });
      })

      socket.on('score', (score_user: string) => {
        // console.log(score_user);
        if (score_user == "ST_RIGHTBALL") {
          if (score1 < 4)
            score1 += 1;
          else {
            won1 += 1;
            score1 = 0;
            score2 = 0;
            level++;
          }
        }

        if (score_user == "ST_LEFTBALL") {
          if (score2 < 4)
            score2 += 1;
          else {
            won2 += 1;
            score2 = 0;
            score1 = 0;
            level++;
          }
        }

      }

      )


      socket.on('update', (ids: number[], player_status: any, ball_status: any) => {
        // console.log('update');
        players = [];
        for (let id of ids) {
          if (players[id] == null || players[id] == undefined) {
            players[id] = new player(player_status[id].x, player_status[id].y);
          }
          else {
            players[id].x = player_status[id].x;
            players[id].y = player_status[id].y;
          }
        }
        ball.x = ball_status.x
        ball.y = ball_status.y
      });
    }, []
  )
  return (
	<div>
    {/* <Nav/> */}
 <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column"}}>
 <canvas id="mango" style={{backgroundColor:"#8c52ff"}} />
 </div>
	</div>
  )
}

export default page