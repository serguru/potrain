import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { Pocket } from '../pocket';
import * as Enum from '../enum';
import { MainService } from '../main.service';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {

  cardHeaders: Array<string> = ["Ace", "King", "Queen", "Jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
  suitHeaders: Array<string> = ["Spade", "Club", "Diamond", "Heart"];

  @Input() card: Card;

  pocketCards: Array<Card>;
  boardCards: Array<Card>;

  get cards(): Array<Card> {
    return this.pocketCards.concat(this.boardCards);
  }

  onfocus($event): void {
    $event.target.blur();
  }

  constructor(private mainService: MainService) {
    this.pocketCards = [];
    this.boardCards = [];
    }

  cardInUse(kind: Enum.Kind, suit: Enum.Suit): boolean {
    let cards = this.cards;

    for (let i: number = 0; i < cards.length; i++) {
      if (cards[i].kind === kind && cards[i].suit === suit) {
        return true;
      }
    }
    return false;
  }

  disabledKind(kind: Enum.Kind): boolean {
    return this.cardInUse(kind, this.card.suit);
  }

  disabledSuit(suit: Enum.Suit): boolean {
    return this.cardInUse(this.card.kind, suit);
  }

  ngOnInit() {
    this.mainService.currentPocket
      .subscribe(pocket => {
        this.pocketCards = pocket ? pocket.cards : [];
      });

    this.mainService.currentBoard
      .subscribe(board => {
        this.boardCards = board ? board.cards : [];
      });
  }

  get kinds(): any {
    let result = [];
    for (let i: number = 0; i < 13; i++) {
      result.push({ value: i + 1, text: this.cardHeaders[i] });
    }
    return result;
  }

  setCardSuit(suit: Enum.Suit) {
    this.card.suit = suit;
  }

  get suits(): any {
    let result = [];
    for (let i: number = 1; i <= 4; i++) {
      result.push({ value: i, text: this.suitHeaders[i - 1], url: "assets/suits/" + i + ".png" });
    }
    return result;
  }

}
