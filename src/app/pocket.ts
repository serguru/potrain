import { Card } from './card';
import { MainService } from './main.service';

export class Pocket {
    
    public card1: Card;
    public card2: Card;

    public get suited(): boolean {
        return this.card1.suit == this.card2.suit;
    }

    constructor(private mainService: MainService) {
        this.card1 = new Card(mainService, this);
        this.card2 = new Card(mainService, this);
    }

    public setRandom(): Pocket {
        this.card1.setRandom();   
        this.card2.setRandom([this.card1]);   
        return this;
    }

    public reset(): void {
        this.card1.kind = null;
        this.card1.suit = null;
        this.card2.kind = null;
        this.card2.suit = null;
    }

    public static ok(pocket: Pocket): boolean {
        return pocket && 
            pocket.card1 && pocket.card1.kind && pocket.card1.suit &&
            pocket.card2 && pocket.card2.kind && pocket.card2.suit ? true : false;
    }
}