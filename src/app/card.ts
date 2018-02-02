import * as Enum from './enum';
import { isArray } from 'util';
import { MainService } from './main.service';
import { Cell } from './cell';

export class Card {

    public get picPath(): string {

        if (!this.kind || !this.suit) {
            return Card.emptyPath();
        }

        return "assets/cards/" + this.kind + "_" + this.suit + ".svg";
    }

    private _suit: Enum.Suit;

    public get suit(): Enum.Suit {
        return this._suit;
    }

    public set suit(value: Enum.Suit) {
        if (this._suit == value) {
            return;
        }

        this._suit = value;
        this.mainService.changeCard(this);
    }

    private _kind: Enum.Kind;

    public get kind(): Enum.Kind {
        return this._kind;
    }

    public set kind(value: Enum.Kind) {
        if (this._kind == value) {
            return;
        }

        this._kind = value;
        this.mainService.changeCard(this);
    }

    constructor(private mainService: MainService, suit?: Enum.Suit, kind?: Enum.Kind) {
    };

    public setCard(exclude: Array<Card>, kind: Enum.Kind, suited: boolean, suit: Enum.Suit): Card {

        for(let i: number = 0; i <= 100; i++) {
            if (i >= 100) {
                throw "Failed to generate a random card, index > 99";
            }

            this.suit = suited ? suit : this.getRandomSuit(suit);
            this.kind = kind || this.getRandomKind();

            if (!this.foundInArray(exclude)) {
                break;
            }
        }
        return this;
    }

    private getRandomSuit(suit: Enum.Suit): Enum.Suit {

        let result: Enum.Suit;

        for(let i: number = 0; i <= 100; i++) {
            result = Math.floor((Math.random() * 4) + 1);

            if (result != suit) {
                break;
            }
        }

        return result;
    }

    private getRandomKind(): Enum.Kind {
        return Math.floor((Math.random() * 13) + 1);
    }

    private foundInArray(exclude: Array<Card>): boolean {
        if (!exclude) {
            return false;
        }
        for (let i: number = 0; i < exclude.length; i++) {
            let card: Card = exclude[i];
            if (this == card) {
                continue;
            }
            if (this.suit == card.suit && this.kind == card.kind) {
                return true;
            }
        }
        return false;
    }

    public static emptyPath(): string {
        return "assets/cards/back_blue.svg";
    }

    reset(): void {
        this.suit = null;
        this.kind = null;
    }

    get ok(): boolean {
        return this.suit && this.kind ? true : false;
    }
}


