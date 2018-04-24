import { Move } from './move';
import { Pocket } from './pocket';
import * as Enum from './enum';
import { Card } from './card';
import { Cell } from './cell';
import { isNumber } from 'util';
import { MainService } from './main.service';
import { ChallengeData } from './challengeData';
import { Challenge } from './challenge';

export class Matrix {

    public data: Array<Array<Cell>>;

    private rawData: ChallengeData;

    constructor() {

        this.rawData = new ChallengeData();

        this.data = new Array<Array<Cell>>();

        for (let i: number = 1; i <= 13; i++) {

            let row: Array<Cell> = new Array<Cell>();

            for (let j: number = 1; j <= 13; j++) {

                const suited: boolean = i < j;

                const cell = new Cell(i, j, suited);
                row.push(cell);
            }
            this.data.push(row);
        }
    }

    private resetRow(rowIndex: number): void {
        let line: Array<Cell> = this.data[rowIndex];

        for (let i: number = 0; i < line.length; i++) {
            let cell: Cell = line[i];
            cell.reset();
        }
    }

    reset(): void {
        for (let i: number = 0; i < this.data.length; i++) {
            this.resetRow(i);
        }
    }


    // Reading data from html file
    // private fillRow(rowIndex: number, trIndex: number, lines: Array<string>): void {
    //     let tdIndex: number = trIndex + 1;

    //     let line: Array<Cell> = this.data[rowIndex];

    //     for (let i: number = 0; i < line.length; i++) {
    //         let cell: Cell = line[i];
    //         cell.fillWithMove(lines[tdIndex]);
    //         tdIndex++;
    //     }
    // }

    public fill(filePath: string): Matrix {

        if (!filePath) {
            this.reset();
            return;
        }

        // Reading data from html file
        // let lines: Array<string> = content.split(/\r\n|\r|\n/g);

        // let trIndex: number = -1;

        // for (let i: number = 0; i < lines.length; i++) {
        //     let s: string = lines[i];
        //     if (s.indexOf('<tr>') >= 0) {
        //         trIndex = i;
        //         break;
        //     }
        // }

        // if (trIndex == -1) {
        //     throw "Source content does not contain <tr> tag";
        // }

        // for (let i: number = 0; i < this.data.length; i++) {
        //     this.fillRow(i, trIndex, lines);
        //     trIndex = trIndex + 15;
        // }


        let slashIndex = filePath.indexOf("/");

        filePath = filePath.substr(slashIndex + 1);

        let jdata: any = this.rawData[filePath];

        for (let i: number = 0; i < this.data.length; i++) {
            let line: Array<Cell> = this.data[i];
            let jline: any = jdata[i];
            for (let j: number = 0; j < line.length; j++) {
                let cell: Cell = line[j];
                let jcell: any = jline[j];
                cell.action = jcell.action;
                cell.percent = jcell.percent;
            }
        }

        return this;
    }

    cellByPocket(pocket: Pocket): Cell {
        if (!Pocket.ok(pocket)) {
            return null;
        }
        let maxKind: number = Math.max(pocket.card1.kind, pocket.card2.kind) - 1;
        let minKind: number = Math.min(pocket.card1.kind, pocket.card2.kind) - 1;
        let result: Cell = pocket.suited ? this.data[minKind][maxKind] : this.data[maxKind][minKind];
        return result;
    }

    private boundaryCell(i: number, j: number): Cell {

        if (!this.data) {
            return null;
        }

        let cell: Cell = this.data[i][j];

        if (!cell.action) {
            return null;
        }

        for (let n: number = i - 1; n <= i + 1; n++) {
            if (n < 0 || n > 12) {
                continue;
            }

            for (let m: number = j - 1; m <= j + 1; m++) {
                if (n == i && m == j || m < 0 || m > 12) {
                    continue;
                }

                let adjacentCell: Cell = this.data[n][m];

                if (cell.action != adjacentCell.action) {
                    return cell;
                }
            }
        }

        return null;
    }

    public get boundaryCells(): Array<Cell> {

        let result: Array<Cell> = [];

        for (let i: number = 0; i < 13; i++) {
            for (let j: number = 0; j < 13; j++) {
                let cell: Cell = this.boundaryCell(i, j);
                if (!cell || result.indexOf(cell) >= 0) {
                    continue;
                };
                result.push(cell);
            }
        }

        return result;
    }
}
