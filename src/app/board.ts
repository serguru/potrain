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

    get state(): Enum.Board {

        if (this.cards[4].ok) {
            return Enum.Board.River;
        }

        if (this.cards[3].ok) {
            return Enum.Board.Turn;
        }

        for (let i: number = 0; i < 3; i++) {
            if (!this.cards[i].ok) {
                return Enum.Board.Empty;
            }
        }

        return Enum.Board.Flop;
    }

    reset(): void {
        for (let i: number = 0; i < 5; i++) {
            this.resetCard(i);
        }
    }

    resetCard(index: number): void {
        this.cards[index].reset();
        this.mainService.changeBoard(this);
    }

    setFlop(): void {

        let state: Enum.Board = this.state;
        this.reset();

        if (state >= Enum.Board.Flop) {
            return;
        }

        for (let i: number = 0; i < 3; i++) {
            this.setCard(i);
        }
    }

    setCard(index: number): void {
        // this.cards[index].reset();
        this.cards[index].setCard(this.cards, null, null, null)
        this.mainService.changeBoard(this);
    }

    setTurn(): void {
        this.resetCard(4);
        let state: Enum.Board = this.state;
        this.resetCard(3);
        if (state == Enum.Board.Turn) {
            return;
        }
        this.setCard(3);
    }

    setRiver(): void {
        let state: Enum.Board = this.state;
        this.resetCard(4);
        if (state == Enum.Board.River) {
            return;
        }
        this.setCard(4);
    }
}