import { Component, Input, OnInit } from '@angular/core';
import { Matrix } from '../matrix';
import { Pocket } from '../pocket';
import { Move } from '../move';
import { Cell } from '../cell';
import * as Enum from '../enum';
import { MainService } from '../main.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent implements OnInit {

  move: Move;
  matrix: Matrix;
  pocket: Pocket;

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

  cardHeaders: Array<string> = ["", "A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

  private cache: any = {};

  private _filePath: string;
  public get filePath(): string {
    return this._filePath;
  }

  public set filePath(value: string) {
    if (this._filePath == value) {
      return;
    }

    this._filePath = value;
    this.fillContent(this._filePath);
  }

  fillContent(filePath: string): void {

    if (!filePath) {
      this.matrix.reset();
      this.mainService.changeBoundaryCells(this.matrix.boundaryCells);
      return;
    }

    let content: any = this.cache[filePath];

    if (content) {
      this.matrix.fill(content);
      return;
    }

    this.mainService.getFile(filePath)
      .subscribe((content) => {
        this.matrix.fill(content);
        this.cache[filePath] = content;
        this.mainService.changeBoundaryCells(this.matrix.boundaryCells);
      });
  }

  constructor(private mainService: MainService) {
    this.matrix = new Matrix();
  }

  ngOnInit() {

    this.mainService.currentChallenge
      .subscribe(challenge => {
        this.filePath = challenge ? challenge.filePath : null;
      });

    this.mainService.currentPocket
      .subscribe(pocket => {
        this.pocket = pocket;
      });

    this.mainService.currentFilePath
      .subscribe(filePath => {
        this.filePath = filePath;
      });

    this.mainService.currentMove
      .subscribe(move => {
        this.move = this.move == move ? null : move;
      });

    this.mainService.currentMatrixVisibility
      .subscribe(visible => {
        this.matrixVisible = visible;
      });
  }

  get raiseSize(): string {
    return this.matrix.raiseSize ? "Best raise size " + this.matrix.raiseSize + " pot" : "";
  }

  get activeCell(): Cell {
    if (!Pocket.ok(this.pocket)) {
      return null;
    }

    let pocketMaxKind: number = Math.max(this.pocket.card1.kind, this.pocket.card2.kind);
    let pocketMinKind: number = Math.min(this.pocket.card1.kind, this.pocket.card2.kind);

    if (this.pocket.suited) {
      return this.matrix.data[pocketMinKind - 1][pocketMaxKind - 1];
    }
    return this.matrix.data[pocketMaxKind - 1][pocketMinKind - 1];
  }

  // activeCell(cell: Cell): boolean {
  //   if (!Pocket.ok(this.pocket)) {
  //     return false;
  //   }

  //   let pocketMaxKind: number = Math.max(this.pocket.card1.kind, this.pocket.card2.kind);
  //   let pocketMinKind: number = Math.min(this.pocket.card1.kind, this.pocket.card2.kind);

  //   if (this.pocket.suited) {
  //     return cell.kind2 == pocketMaxKind && cell.kind1 == pocketMinKind;
  //   }

  //   return cell.kind1 == pocketMaxKind && cell.kind2 == pocketMinKind;
  // }

  get rightMove(): Move {
    let cell = this.matrix.cellByPocket(this.pocket);
    return cell ? new Move(cell.action, this.matrix.raiseSize) : null;
  }

  get moveEstimate(): string {
    if (!this.move) {
      return "";
    }

    let rm: Move = this.rightMove;
    if (!rm) {
      return "";
    }

    let raiseComparison: boolean = rm.action == Enum.Action.Raise ? this.move.size == rm.size : true;
    return this.move.action == rm.action && raiseComparison ? "right" : "wrong";
  }

  class(cell: Cell): string {

    if (!cell) {
      return "";
    }

    let ac: Cell = this.activeCell;

    let focused: boolean = ac && (ac.kind1 == cell.kind1 && ac.kind2 == cell.kind2);
    let highlighted: boolean = ac && (ac.kind1 == cell.kind1 || ac.kind2 == cell.kind2);

    return (this.matrixVisible ? cell.class : "empty-move") + (focused ? " focused" : "") + (highlighted ? " highlighted" : "");
  }

  headerClass(header: string, horizontal: boolean): string {
    if (!header) {
      return "";
    }

    let ac = this.activeCell;
    if (!ac) {
      return "";
    }

    let index: number = this.cardHeaders.indexOf(header);

    return index == (horizontal ? ac.kind2 : ac.kind1) ? "bold" : "";

  }


}
