import * as Enum from './enum';
import { Challenge } from './challenge';

export class Step {
    private _position: Enum.Position;

    public get position(): Enum.Position {
        return this._position;
    }

    public set position(value: Enum.Position) {
        if (this._position == value) {
            return;
        }

        this._position = value;
        this.challenge.positionChanged();

        if (this.challenge.onPositionChanged && this.index == 0) {
            this.challenge.onPositionChanged(this);
        }
    }

    constructor(public question: string, public challenge: Challenge) {
    }

    get index(): number {
        let result: number = this.challenge.steps.indexOf(this);
        return result;
    }

    private prefixByIndex(index: number): string {
        let result: string = "";

        for(let i: number = 0; i <= index; i++) {
            let p: Enum.Position = this.challenge.steps[i].position;
            if (!p) {
                return null;
            }
            result += p + "_";
        }

        return result;
    }

    get prefix(): string {
        return this.prefixByIndex(this.index);
    }

    get prePrefix(): string {
        return this.prefixByIndex(this.index - 1);
    }

    get disabled(): boolean {
        return this.positions.length == 0;
    }

    // positions allowed for this step
    get positions(): Array<Enum.Position> {

        let result: Array<Enum.Position> = [];
        let p: string = this.prePrefix;

        if (p == null) {
            return result;
        }

        let ind: number = this.index;

        for(let i: number = 0; i < this.challenge.files.length; i++) {
            let file = this.challenge.files[i];
            if (!file.startsWith(p)) {
                continue;
            }

            let position: Enum.Position = Number(file.charAt(ind * 2));
            
            if (result.indexOf(position) < 0) {
                result.push(position);
            }

        }

        if (result.length == 0) {
            this.position = null;
        } else if (result.length == 1) {
            this.position = result[0];
        } else if (result.indexOf(this.position) < 0) {
            this.position = result[0];
        };

        return result;
    }

}
