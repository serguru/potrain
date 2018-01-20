import { Move } from './move';
import { Pocket } from './pocket';
import * as Enum from './enum';
import { Card } from './card';
import { Cell } from './cell';
import { isNumber } from 'util';

export class Matrix {

    public data: Array<Array<Cell>>;
    public raiseSize: number; // best rise size in pots

    constructor() {

        this.data = new Array<Array<Cell>>();
        let i: number = 0;

        for (const kindV in Enum.Kind) {

            if (isNaN(Number(kindV))) {
                continue;
            }

            i++;

            let j = 0;
            let row: Array<Cell> = new Array<Cell>();

            for (const kindH in Enum.Kind) {

                if (isNaN(Number(kindH))) {
                    continue;
                }
                i++;

                const suited: boolean = i < j;

                const cell = new Cell(Number(kindV),Number(kindH),suited);
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

    private resetRow(rowIndex: number) : void {
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

        this.raiseSize = !match || match.length == 0 ? undefined : Number(match[0].substring(1,match[0].length - 1));

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
            this.fillRow(i,trIndex,lines);
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
}
