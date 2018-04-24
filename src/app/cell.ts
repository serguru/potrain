import * as Enum from './enum';
import { Card } from './card';

export class Cell {

    public action: Enum.Action;
    public percent: number;

    constructor(public kind1: Enum.Kind, public kind2: Enum.Kind, public suited: boolean) {
    }

    public reset(): void {
        this.action = null;
        this.percent = null;
    }

    public get class(): string {
        switch (this.action) {
            case Enum.Action.Raise:
                return "raise-move";
            case Enum.Action.Call:
                return "call-move";
            case Enum.Action.Fold:
                return "fold-move";
            default:
                return "empty-move";
        }
    }

    // public fillWithMove(s: string): void {

    //     if (s.indexOf('<td class="r">') >= 0) {
    //         this.action = Enum.Action.Raise;
    //     } else if (s.indexOf('<td class="c">') >= 0) {
    //         this.action = Enum.Action.Call;
    //     } else {
    //         this.action = Enum.Action.Fold;
    //     }

    //     let match: RegExpMatchArray = s.match(/>-?\d?\d+</);

    //     if (!match || match.length == 0) {
    //         this.percent = undefined;
    //         return;
    //     }

    //     this.percent = Number(match[0].substring(1, match[0].length - 1));
    // }
}
