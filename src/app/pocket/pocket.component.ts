import * as Enum from '../enum';
import { Component, OnInit } from '@angular/core';
import { Pocket } from '../pocket';
import { Move } from '../move';
import { MainService } from '../main.service';
import { Card } from '../card';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {

  pocket: Pocket;
  moves: Array<Move>;
  selectedMove: Move;
  selectedCardIndex: number;
  autoHideMatrix: boolean = true;

  constructor(private mainService: MainService) {
    this.pocket = new Pocket(mainService);
    this.moves = [];

    this.moves.push(new Move(Enum.Action.Fold));
    this.moves.push(new Move(Enum.Action.Call));
    this.moves.push(new Move(Enum.Action.Raise, 0.5));
    this.moves.push(new Move(Enum.Action.Raise, 1));
  }

  private _matrixVisible: boolean;
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
    this.mainService.currentMove
      .subscribe(move => {
        this.selectedMove = this.selectedMove != move ? move : null;
      });

      this.mainService.currentMatrixVisibility
      .subscribe(visible => {
        this.matrixVisible = visible;
      });
  }

  private processMatrixVisibility(): void {
    if (this.autoHideMatrix) {
      this.matrixVisible = false;
    }
  }

  public random(): void {
    this.selectedCardIndex = null;
    this.selectedMove = null;
    this.pocket.setRandom();
    this.mainService.changePocket(this.pocket);
    this.processMatrixVisibility();
  }

  public reset(): void {
    this.selectedCardIndex = null;
    this.selectedMove = null;
    this.pocket.reset();
    this.mainService.changePocket(this.pocket);
    this.processMatrixVisibility();
  }

  setSelected(index: number): void {
    if (index == this.selectedCardIndex) {
      this.selectedCardIndex = null;
      return;
    }
    this.selectedCardIndex = index;
  }

  get disabled(): boolean {
    return !Pocket.ok(this.pocket);
  }

  changeMatrixVisibility(): void {
    this.matrixVisible = !this.matrixVisible;
  }


}

