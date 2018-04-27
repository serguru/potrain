import * as Enum from './enum';

export class Move {

    public estimate: boolean;

    constructor(public action: Enum.Action) {

    };
    public get name(): string {
        let n: string = Enum.Action[this.action];

        switch (this.action) {
            case Enum.Action.Fold:
            case Enum.Action.Call:
            case Enum.Action.Raise:
                return n;
            default:
                return "";
        }
    }
}


