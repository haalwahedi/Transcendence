import Room from './room';

export default class RoomManager {
    rooms: { [key: string]: Room };
    num_rooms: number;
    io: any;

    constructor(io: any) {
        this.rooms = {};
        this.num_rooms = 0;
        this.io = io;
    }

    
    create_room(p1: any, p2: any) {
        let to_add = new Room(p1, p2, this.io,1);
        to_add.init();
        console.log('Room Created!');
        this.rooms[to_add.id] = to_add;
        this.rooms[to_add.id].print_room();
        this.num_rooms++;
    }

    destroy(room: Room) {
        this.num_rooms--;
        delete this.rooms[room.id];
    }

    update() {
        for (const id in this.rooms) {
            this.rooms[id].update();
        }
    }

    find_room(to_find: string): Room | undefined {
        let room: Room | undefined;
        for (const id in this.rooms) {
            if (id.includes(to_find)) {
                room = this.rooms[id];
                return room;
            }
        }
        return undefined
    }

    find_user(to_find: string): any {
        let user: any;
        for (const id in this.rooms) {
            if (id.includes(to_find)) {
                let room = this.rooms[id];
                user = room.player1.id === to_find ? room.player1 : room.player2;
                return user;
            }
        }
    }

    print_all_rooms() {
        for (const id in this.rooms) {
            this.rooms[id].print_room();
        }
        console.log("num rooms: " + this.num_rooms);
    }
}
