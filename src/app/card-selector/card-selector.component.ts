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

  cardHeaders: Array<string> = ["A","K","Q","J","10","9","8","7","6","5","4","3","2"];
  suitHeaders: Array<string> = ["Spade","Club","Diamond","Heart"];

  @Input() pocket: Pocket;
  @Input() index: number;

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
  
  get suits(): any {
    let result = [];
    for (let i: number = 0; i < 4; i++) {
      result.push({value: i + 1, text: this.suitHeaders[i]});
    }
    return result;
  }
}
