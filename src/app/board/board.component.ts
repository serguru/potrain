import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { MainService } from '../main.service';
import { Board } from '../board';
import * as Enum from '../enum';
import { Pocket } from '../pocket';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  selectedBoardCard: Card;
  selectedPocketCard: Card;
  board: Board;
  timer: any;
  delay: number = 300;
  prevent: boolean = false;
  pocket: Pocket;

  constructor(private mainService: MainService) {
    this.board = new Board(mainService);
    this.pocket = new Pocket(mainService);
    this.pocket.boundaryOnly = false;
  }

  ngOnInit() {
  }

  private doClickAction(card: Card): void {
    this.selectedBoardCard = null;
    
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

  setSelectedBoardCard(card: Card): void {
    if (this.selectedBoardCard == card || this.getDisabled(card)) {
      this.selectedBoardCard = null;
      return;
    }

    this.selectedBoardCard = card;
  }

  setSelectedPocketCard(card: Card): void {
    if (this.selectedPocketCard == card) {
      this.selectedPocketCard = null;
      return;
    }

    this.selectedPocketCard = card;
  }

  onDblClick(card: Card): void {
    clearTimeout(this.timer);
    this.prevent = true;
    this.setSelectedBoardCard(card);
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

  public random(): void {
    this.selectedPocketCard = null;
    this.pocket.setRandom();
  }

  public reset(): void {
    this.selectedPocketCard = null;
    this.pocket.reset();
  }


}
