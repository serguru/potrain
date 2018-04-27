import { Component, Input, OnInit } from '@angular/core';
import { Matrix } from '../matrix';
import { Pocket } from '../pocket';
import { Move } from '../move';
import { Cell } from '../cell';
import * as Enum from '../enum';
import { MainService } from '../main.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';


@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css'],
  animations: [
    trigger('visibility', [
      transition('* => *', [
        animate(500, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]),
    ])
  ]
  
})

export class MatrixComponent implements OnInit {

  move: Move;
  matrix: Matrix;
  pocket: Pocket;
  crossCell: Cell;
  crossCellFixed: boolean;
  wrongMovesCount: number;
  rightMovesCount: number;

  cardHeaders: Array<string> = ["", "A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

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

  //private cache: any = {};

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

      this.matrix.fill(filePath);
      this.mainService.changeBoundaryCells(this.matrix.boundaryCells);


    // let content: any = this.cache[filePath];

    // if (content) {
    //   this.matrix.fill(content);
    //   this.mainService.changeBoundaryCells(this.matrix.boundaryCells);
    //   return;
    // }

    // this.mainService.getFile(filePath)
    //   .subscribe((content) => {
    //     this.matrix.fill(content);

    // Getting data as str from html to convert them to json and use in ChallengeData class

    //     let datastr = JSON.stringify(this.matrix.data);
    //     let datacopy = JSON.parse(datastr);

    //     for (let i: number = 0; i < datacopy.length; i++) {
    //         let line: Array<Cell> = datacopy[i];
    //         for (let j: number = 0; j < line.length; j++) {
    //             let cell: Cell = line[j];
    //             delete cell.kind1;
    //             delete cell.kind2;
    //             delete cell.suited;
    //         }
    //     }

    //     let finalObject = {};
    //     let dataName = filePath.replace(".html","");

    //     let slashIndex = dataName.indexOf("/");

    //     dataName = dataName.substr(slashIndex + 1);

    //     finalObject[dataName] = datacopy;
    //     datastr = JSON.stringify(finalObject);

    //     datastr = datastr.substr(2,datastr.length - 3);

    //     this.cache[filePath] = content;
    //     this.mainService.changeBoundaryCells(this.matrix.boundaryCells);
    //   });
  }

  constructor(private mainService: MainService) {
    this.crossCellFixed = false;
    this.matrix = new Matrix();

    this.wrongMovesCount = 0;
    this.rightMovesCount = 0;
  

  }

  ngOnInit() {

    this.mainService.currentChallenge
      .subscribe(challenge => {
        this.filePath = challenge ? challenge.filePath : null;
      });

    this.mainService.currentPocket
      .subscribe(pocket => {
        this.pocket = pocket;

        if (!Pocket.ok(this.pocket)) {
          this.rightMovesCount = 0;
          this.wrongMovesCount = 0;
        }
      });

    this.mainService.currentFilePath
      .subscribe(filePath => {
        this.filePath = filePath;
      });


    this.mainService.currentMoveEstimate
    .subscribe(move => {

      if (!move) {
        return;
      }

      if (move.estimate == true) {
        this.rightMovesCount++;
        return;
      }

      if (move.estimate == false) {
        this.wrongMovesCount++;
      }
    });

    this.mainService.currentMove
      .subscribe(move => {
        this.move = this.move == move ? null : move;

        if (!this.move) {
          return;
        }
    
        let rm: Move = this.rightMove;
        if (!rm) {
          return;
        }
    
        this.move.estimate = this.move.action == rm.action;
      
        this.mainService.changeMoveEstimate(move);
      });

    this.mainService.currentMatrixVisibility
      .subscribe(visible => {
        this.matrixVisible = visible;
        if (this.matrixVisible) {
          return;
        }
        this.crossCell = null;  
        this.crossCellFixed = false;
    });

      this.matrixVisible = true;
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

  get rightMove(): Move {
    let cell = this.matrix.cellByPocket(this.pocket);
    return cell ? new Move(cell.action) : null;
  }

  get moveEstimate(): string {
    if (!this.move) {
      return "";
    }

    let rm: Move = this.rightMove;
    if (!rm) {
      return "";
    }

    return this.move.action == rm.action ? "right" : "wrong";
  }

  class(cell: Cell): string {

    if (!cell) {
      return "";
    }

    let ac: Cell = this.activeCell || this.crossCell;

    let focused: boolean = ac && (ac.kind1 == cell.kind1 && ac.kind2 == cell.kind2);
    let highlighted: boolean = ac && (ac.kind1 == cell.kind1 || ac.kind2 == cell.kind2);

    return (this.matrixVisible ? cell.class : "empty-move") + (focused ? " focused" : "") + (highlighted ? " highlighted" : "");
  }

  headerClass(header: string, horizontal: boolean): string {
    if (!header) {
      return "";
    }

    let ac = this.activeCell || this.crossCell;
    if (!ac) {
      return "";
    }

    let index: number = this.cardHeaders.indexOf(header);

    return index == (horizontal ? ac.kind2 : ac.kind1) ? "bold" : "";

  }

  public get currentMoveContent(): string {

    if (!this.crossCell) {
      return "";
    }

    let s: string = "";

    switch (this.crossCell.action) {
      case Enum.Action.Raise:
        s = "raise";
        break;
      case Enum.Action.Call:
        s = "call";
        break;
      case Enum.Action.Fold:
        s = "fold";
        break;
      default:
        s = "";
    }

    return this.cardHeaders[this.crossCell.kind1] + this.cardHeaders[this.crossCell.kind2] +
      (this.crossCell.kind1 != this.crossCell.kind2 ? (this.crossCell.suited ? "s" : "o") : "") + " " + s;
  }

  public get moveContentClass(): string {
    let result: string = "move-content h4 ";

    if (!this.crossCell) {
      return result;
    }

    switch (this.crossCell.action) {
      case Enum.Action.Raise:
          return result + "raise-content";
      case Enum.Action.Call:
          return result + "call-content";
      case Enum.Action.Fold:
          return result + "fold-content";
      default:
          return result;
    }
  }

  onMouseOver(cell: Cell): void {

    if (this.activeCell || !this.matrixVisible) {
      this.crossCell = null;  
      this.crossCellFixed = false;
      return;
    }

    if (this.crossCellFixed) {
      return;
    }
    this.crossCell = cell;
  }

  onMouseClick(cell: Cell): void {

    if (this.activeCell || !this.matrixVisible || this.crossCellFixed && cell == this.crossCell) {
      this.crossCell = null;  
      this.crossCellFixed = false;
      return;
    }

    this.crossCellFixed = true;
    this.crossCell = cell;
  }

  public get totalMovesCount(): number {
    return this.rightMovesCount + this.wrongMovesCount;
  }

  public get rightMovesPercent(): string {
    let t: number = this.totalMovesCount;

    if (t <= 0) {
      return "0%";
    }

    return Math.round(this.rightMovesCount / t * 100) + "%";

  }
}
