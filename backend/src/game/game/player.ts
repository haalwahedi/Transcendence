export default class Player {
    to_trans: { x: number; y: number };
    points: number;
    score:number;
    username: string;
    id: string;
    keypress: boolean[];
    keyonce: boolean[];
    width: number;
    height: number;

    constructor(info: { username: string; id: string }, xpos = 0, ypos = 0) {
        this.to_trans = { x: xpos, y: ypos };
        this.points = 0;
        this.score = 0
        this.username = info.username;
        this.id = info.id;
        this.keypress = [];
        this.keyonce = [];

        // HARD-CODED
        this.width = 20;
        this.height = 100;
    }
}
