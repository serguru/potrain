import { Move } from './move';
import { Pocket } from './pocket';
import * as Enum from './enum';
import { Card } from './card';
import { Cell } from './cell';
import { isNumber } from 'util';
import { MainService } from './main.service';

export class Matrix {

    public data: Array<Array<Cell>>;
    public raiseSize: number; // best rise size in pots

    constructor() {

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

    private fillRow(rowIndex: number, trIndex: number, lines: Array<string>): void {
        let tdIndex: number = trIndex + 1;

        let line: Array<Cell> = this.data[rowIndex];

        for (let i: number = 0; i < line.length; i++) {
            let cell: Cell = line[i];
            cell.fillWithMove(lines[tdIndex]);
            tdIndex++;
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
        this.raiseSize = null;
        for (let i: number = 0; i < this.data.length; i++) {
            this.resetRow(i);
        }
    }

    public fill(content: string): Matrix {

        if (!content) {
            this.reset();
            return;
        }

        let lines: Array<string> = content.split(/\r\n|\r|\n/g);

        let s: string = lines[2]; // <b>1 pot</b> or <b>0.5 pot</b>

        let match: RegExpMatchArray = s.match(/>(\d |\d\.\d )/);

        this.raiseSize = !match || match.length == 0 ? undefined : Number(match[0].substring(1, match[0].length - 1));

        let trIndex: number = -1;

        for (let i: number = 0; i < lines.length; i++) {
            let s: string = lines[i];
            if (s.indexOf('<tr>') >= 0) {
                trIndex = i;
                break;
            }
        }

        if (trIndex == -1) {
            throw "Source content does not contain <tr> tag";
        }

        for (let i: number = 0; i < this.data.length; i++) {
            this.fillRow(i, trIndex, lines);
            trIndex = trIndex + 15;
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
