import * as Enum from './enum';

export class Player {

    public move: Enum.Action;

    constructor(public position: Enum.Position) {

    };

    public get posName(): string {
        return this.position < 4 ? String(this.position) : Enum.Position[this.position];
    }
}


