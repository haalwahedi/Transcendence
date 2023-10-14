export default class Lobby {
    players: { [key: string]: any };
    public_queue: any[];
    num_player: number;

    constructor() {
        this.players = {};
        this.public_queue = [];
        this.num_player = 0;
    }

    add_player(id: string, username: string, room_code = "public") {
        let player = {
            id: id,
            username: username,
            room_code: room_code
        };

        if (player.room_code === "public") {
            this.players[id] = player;
            this.public_queue.push(player);
            this.num_player++;
        }
    }

    remove_player(id: string) {
        if (this.players[id] != null) {
            this.public_queue.shift();
            delete this.players[id];
            this.num_player--;
        }
    }

    get_num_player(): number {
        return this.public_queue.length;
    }
}
