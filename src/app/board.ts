import { Card } from './card';
import { MainService } from './main.service';
import * as Enum from './enum';

export class Board {

    cards: Array<Card>;

    constructor(private mainService: MainService) {
        this.cards = [];

        for (let i: number = 0; i < 5; i++) {
            this.cards.push(new Card(mainService));
        }
    }

    reset(): void {
        for (let i: number = 0; i < 5; i++) {
            this.cards[i].reset();
        }
        this.mainService.changeBoard(this);
    }

    generateFlop(count: number): void {
        this.reset();

        let cards: Array<Card> = [];

        for (let i: number = 0; i < count; i++) {
            this.cards[i].setCard(cards, null, null, null);
            cards.push(this.cards[i]);
        }
        this.mainService.changeBoard(this);
    }
}