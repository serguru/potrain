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

  cardHeaders: Array<string> = ["Ace","King","Queen","Jack","10","9","8","7","6","5","4","3","2"];
  suitHeaders: Array<string> = ["Spade","Club","Diamond","Heart"];

  @Input() pocket: Pocket;
  @Input() index: number;

  get kind(): Enum.Kind {
    return this.card.kind;
  }

  set kind(value:Enum.Kind) {
    if (this.card.kind == value) {
      return;
    }
    this.card.kind = value;
    if (!this.card.suit) {
      this.card.suit = Enum.Suit.Spade;
    }

    document.getElementById("kindSelect").blur();
  }

  get card(): Card {
    if (!this.index) {
      return null;
    }

    return this.index == 1 ? this.pocket.card1 : this.pocket.card2;
  }

  get otherCard(): Card {
    return this.card == this.pocket.card1 ? this.pocket.card2 : this.pocket.card1;
  }

  disabledSuit(suit: Enum.Suit): boolean {
    if (!this.otherCard || this.otherCard.suit != suit) {
      return false;
    }    

    return this.card.kind == this.otherCard.kind;
  } 

  disabledKind(kind: Enum.Kind): boolean {
    if (!this.otherCard || this.otherCard.kind != kind) {
      return false;
    }    

    return this.card.suit == this.otherCard.suit;
  } 

  constructor(private mainService: MainService) { 
  }

  ngOnInit() {
  }

  get kinds(): any {
    let result = [];
    for (let i: number = 0; i < 13; i++) {
      result.push({value: i + 1, text: this.cardHeaders[i]});
    }
    return result;
  }
  
  setCardSuit(suit: Enum.Suit) {

    if (this.card.suit == suit) {
      return;
    }

    this.card.suit = suit;
    if (!this.card.kind) {
      this.card.kind = Enum.Kind.Ace;
    }
  }

  get suits(): any {
    let result = [];
    for (let i: number = 1; i <= 4; i++) {
      result.push({value: i, text: this.suitHeaders[i-1], url: "assets/suits/" + i + ".png"});
    }
    return result;
  }
}
