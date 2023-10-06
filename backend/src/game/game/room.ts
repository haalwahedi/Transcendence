import Ball from './ball';
import Player from './player';
import fs from 'fs'
// var configData = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
interface Config {
    screen_width: number;
    screen_height: number;
    player_width: number;
    player_height: number;
    end_point: number;
}

const config: Config = {
    "screen_width" : 700,
    "screen_height" : 600,
    "player_width" : 20,
    "player_height" : 100,
    "end_point" : 5 
};

const game_state = ["ST_IDLE", "ST_DISCONNECTED", "ST_ONGAME", "ST_LEFTBALL", "ST_RIGHTBALL"];
const UP = 38, DOWN = 40, SPACE = 32;

export default class Room {
    player1: Player;
    player2: Player;
    ball: Ball;
    curr_state: string;
    level:number;
    id: string;
    io: any;
    game_done: boolean;
    players: Player[];

    constructor(p1: any, p2: any, io: any,level:number) {
        this.player1 = new Player(p1, config.player_width, (config.screen_height - config.player_height) / 2);
        this.player2 = new Player(p2, config.screen_width - config.player_width * 2, (config.screen_height - config.player_height) / 2);
        this.ball = new Ball((config.screen_width - config.player_width) / 2, (config.screen_height - config.player_width) / 2);
        this.curr_state = "ST_IDLE";
        this.id = p1.id + p2.id;
        this.io = io;
        this.game_done = false;
        this.level = level
        this.players = [];
        this.players.push(this.player1);
        this.players.push(this.player2);
    }

    init() {
        this.player1.username = "Player 1";
        this.player2.username = "Player 2";
        let usernames = [this.player1.username, this.player2.username];
        console.log(usernames);
        this.io.to(this.player1.id).emit('usernames', ["Player 1", "Player 2"]);
        this.io.to(this.player2.id).emit('usernames', ["Player 1", "Player 2"]);
        this.io.to(this.player1.id).emit('config', config);
        this.io.to(this.player2.id).emit('config', config);
    }

    update() {
        let status: { [key: string]: { x: number; y: number } } = {};
        let ids: string[] = [];
        let start_player = this.player1;

        if (this.curr_state === "ST_RIGHTBALL") {
            start_player = this.player2;
        }

        this.players.forEach(player => {
            if (player.keypress[UP] && player.to_trans.y >= 0) {
                player.to_trans.y -= 7;
            }
            if (player.keypress[DOWN] && player.to_trans.y + player.height < config.screen_height) {
                player.to_trans.y += 7;
            }
            if (start_player.keypress[SPACE] && this.curr_state !== "ST_ONGAME"
                && this.curr_state !== "ST_GAMEOVER"
                && (this.curr_state === "ST_LEFTBALL" || this.curr_state === "ST_RIGHTBALL"
                || this.curr_state === "ST_IDLE")) {
                this.ball.vel_x = this.ball.speed;
                this.curr_state = "ST_ONGAME";
            }
            ids.push(player.id);
            status[player.id] = player.to_trans;
        });
        
        if(this.player1.points === 5 )
        {
            this.player1.score += 1;
            this.level ++ ;
            this.player1.points = 0;
            this.player2.points = 0;
        }
        else if(this.player2.points === 5)
        {
            this.player2.score += 1;
            this.level++ ;
            this.player2.points = 0;
            this.player1.points = 0;
        }

        if (( this.level === 4  )
            && this.curr_state !== "ST_GAMEOVER"
            && !this.game_done) {
                
            let winner =  this.player1.score>this.player2.score ? this.player1.username : this.player2.username;
            let winning_text = winner + ' Won!';
            this.curr_state = "ST_GAMEOVER";
            this.io.to(this.player1.id).emit('game_over', winning_text);
            this.io.to(this.player2.id).emit('game_over', winning_text);
            this.game_done = true;
        }

        if (!this.game_done) {
            this.curr_state = this.ball.update(this.player1, this.player2, this.curr_state, this.io,this.level);
            this.io.to(this.player1.id).emit('update', ids, status, this.ball.to_trans);
            this.io.to(this.player2.id).emit('update', ids, status, this.ball.to_trans);
        }
    }

    disconnect(id: string) {
        this.curr_state = "ST_DISCONNECTED";
        let disconnected_user = (id === this.player1.id) ? this.player1.username : this.player2.username;
        let connected_id = (id === this.player1.id) ? this.player2.id : this.player1.id;
        let msg = disconnected_user + " has left the game";
        this.io.to(connected_id).emit('game_over', msg);
        console.log(msg);
    }

    print_room() {
        console.log("----------------------------------");
        console.log("Room ID: " + this.id);
        console.log("player 1: " + this.player1.username + "(" + this.player1.id + ")");
        console.log("player 2: " + this.player2.username + "(" + this.player2.id + ")");
        console.log("----------------------------------");
    }
}
