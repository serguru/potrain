import { Card } from './card';
import { MainService } from './main.service';
import { Cell } from './cell';
import * as Enum from './enum';

export class Pocket {

    public card1: Card;
    public card2: Card;
    boundaryCells: Array<Cell>;
    boundaryOnly: boolean = true;

    public get suited(): boolean {
        return this.card1.suit == this.card2.suit;
    }

    constructor(private mainService: MainService) {
        this.card1 = new Card(mainService);
        this.card2 = new Card(mainService);
    }

    public setRandom(): Pocket {

        if (this.boundaryOnly) {

            if (!this.boundaryCells || this.boundaryCells.length == 0) {
                throw "Failed generating a random card, boundary cells array is empty";
            }

            let count: number = this.boundaryCells.length;
            let index: number = Math.floor(Math.random() * count);
            let cell: Cell = this.boundaryCells[index];

            this.card1.setCard(null, cell.kind1, null, null);
            this.card2.setCard([this.card1], cell.kind2, cell.suited, this.card1.suit);
        } else {
            this.card1.setCard(null, null, null, null);
            this.card2.setCard([this.card1], null, null, null);
        }

        return this;
    }

    public reset(): void {
        this.card1.reset();
        this.card2.reset();
    }

    public static ok(pocket: Pocket): boolean {
        return pocket &&
            pocket.card1 && pocket.card1.kind && pocket.card1.suit &&
            pocket.card2 && pocket.card2.kind && pocket.card2.suit ? true : false;
    }

    public static okHalf(pocket: Pocket): boolean {
        return pocket && (
            pocket.card1 && pocket.card1.kind && pocket.card1.suit ||
            pocket.card2 && pocket.card2.kind && pocket.card2.suit) ? true : false;
    }

    get cards(): Array<Card> {
        return [this.card1, this.card2];
    }
}