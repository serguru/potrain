import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { MainService } from '../main.service';
import { Board } from '../board';
import * as Enum from '../enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  selectedCard: Card;
  board: Board;
  timer: any;
  delay: number = 300;
  prevent: boolean = false;

  constructor(private mainService: MainService) {
    this.board = new Board(mainService);
  }

  ngOnInit() {
  }

  private doClickAction(card: Card): void {
    this.selectedCard = null;
    
    let index: number = this.board.cards.indexOf(card);

    if (index == 4) {
      if (this.board.state < Enum.Board.Turn) {
        return;
      }
      this.board.setRiver();
      return;
    }

    if (index == 3) {
      if (this.board.state < Enum.Board.Flop) {
        return;
      }
      this.board.setTurn();
      return;
    }

    this.board.setFlop();
  }

  onClick(card: Card): void {
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        this.doClickAction(card);
      }
      this.prevent = false;
    }, this.delay);
  }

  setSelected(card: Card): void {
    if (this.selectedCard == card) {
      this.selectedCard = null;
      return;
    }

    this.selectedCard = card;
  }

  onDblClick(card: Card): void {
    clearTimeout(this.timer);
    this.prevent = true;
    this.setSelected(card);
  }

  getDisabled(card: Card): string {
    let index: number = this.board.cards.indexOf(card);
    let state: Enum.Board = this.board.state;

    switch (index) {
      case 4:
        return state < Enum.Board.Turn ? "disabled-card" : "";
      case 3:
        return state < Enum.Board.Flop ? "disabled-card" : "";
      default:
        return "";
    }
  }
}
