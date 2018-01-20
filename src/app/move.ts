import * as Enum from './enum';

export class Move {
    constructor(public action: Enum.Action, public size?: number) {

    };
    public get name(): string {
        let n: string = Enum.Action[this.action];

        switch (this.action) {
            case Enum.Action.Fold:
            case Enum.Action.Call:
                return n;
            case Enum.Action.Raise:
                return n + (this.size ? " " + this.size + " pot" : "?");
            default:
                return "";
        }
    }
}


