import * as Enum from '../enum';
import { Component, OnInit } from '@angular/core';
import { Pocket } from '../pocket';
import { Move } from '../move';
import { MainService } from '../main.service';
import { Card } from '../card';
import { Cell } from '../cell';

@Component({
  selector: 'app-mover',
  templateUrl: './mover.component.html',
  styleUrls: ['./mover.component.css']
})
export class MoverComponent implements OnInit {

  pocket: Pocket;
  moves: Array<Move>;
  selectedMove: Move;
  selectedCard: Card;
  autoHideMatrix: boolean = false;

  constructor(private mainService: MainService) {
    this.pocket = new Pocket(mainService);
    this.moves = [];

    this.moves.push(new Move(Enum.Action.Fold));
    this.moves.push(new Move(Enum.Action.Call));
    this.moves.push(new Move(Enum.Action.Raise));
  }

  private _matrixVisible: boolean = true;
  public get matrixVisible(): boolean {
    return this._matrixVisible;
  }
  public set matrixVisible(value: boolean) {
    if (this._matrixVisible == value) {
      return;
    }

    this._matrixVisible = value;
    this.mainService.changeMatrixVisibility(this.matrixVisible);
  }

  ngOnInit() {
    this.mainService.currentCard
      .subscribe(card => {
        if (card == this.pocket.card1 || card == this.pocket.card2) {
          this.mainService.changePocket(this.pocket);
        }
      });

      this.mainService.currentMove
      .subscribe(move => {
        this.selectedMove = this.selectedMove != move ? move : null;
      });

    this.mainService.currentMatrixVisibility
      .subscribe(visible => {
        this.matrixVisible = visible;
      });

    this.mainService.currentBoundaryCells
      .subscribe(cells => {
        this.pocket.boundaryCells = cells;
      });
  }

  private processMatrixVisibility(): void {
    if (this.autoHideMatrix) {
      this.matrixVisible = false;
    }
  }

  public random(): void {
    this.selectedCard = null;
    this.selectedMove = null;
    this.pocket.setRandom();
    this.mainService.changePocket(this.pocket);
    this.processMatrixVisibility();
  }

  public reset(): void {
    this.selectedCard = null;
    this.selectedMove = null;
    this.pocket.reset();
    this.mainService.changePocket(this.pocket);
    this.processMatrixVisibility();
  }

  setSelected(card: Card): void {
    if (card == this.selectedCard) {
      this.selectedCard = null;
      return;
    }
    this.selectedCard = card;
  }

  get disabled(): boolean {
    return !Pocket.okHalf(this.pocket);
  }

  onfocus($event): void {
    $event.target.blur();
  }
}

