import { Player } from './player';
import * as Enum from './enum';

export class Table {

    public players: Array<Player> = [];

    constructor() {
        for (let i: number = 1; i <= 6; i++) {
            let player = new Player(i);
            this.players.push(player);
        }
    };
}