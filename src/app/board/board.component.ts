import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { MainService } from '../main.service';
import { Board } from '../board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  selectedCard: Card;

  board: Board;

  constructor(private mainService: MainService) {
    this.board = new Board(mainService);
  }

  ngOnInit() {
  }

  setSelected(card: Card): void {
    if (this.selectedCard == card) {
      this.selectedCard = null;
      return;
    }

    this.selectedCard = card;
  }


}
