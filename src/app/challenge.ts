import { Matrix } from './matrix';
import { Step } from './step';
import * as Enum from './enum';

export class Challenge {

    name: string;
    folder: string;
    steps: Array<Step>;
    files: Array<string>;

    private _filePath: string;

    public get filePath(): string {
        return this._filePath;
    }

    public set filePath(value: string) {
        if (this._filePath == value) {
            return;
        }

        this._filePath = value;
        if (this.onFilePathChanged) {
            this.onFilePathChanged(this.filePath);
        }
    }

    public getFilePath(): string {
        let lastStep: Step = this.steps[this.steps.length - 1];
        let prefix: string = lastStep.prefix;

        if (!prefix) {
            return null;
        }

        for (let i: number = 0; i < this.files.length; i++) {
            let fileName: string = this.files[i];
            if (fileName.startsWith(prefix)) {
                return this.folder + "/" + fileName;
            }
        }

        return null;
    }    

    constructor(challenge: {
            name: string,
            folder: string,
            questions: Array<string>,
            files: Array<string>
        },
        private onFilePathChanged: Function,
        public onPositionChanged: Function
    ) {

        this.name = challenge.name;
        this.folder = challenge.folder;
        this.files = challenge.files;

        this.steps = [];

        for (let i: number = 0; i < challenge.questions.length; i++) {
            let step: Step = new Step(challenge.questions[i], this);
            this.steps.push(step);
        }
    }

    public positionChanged(): void {
        this.filePath = this.getFilePath();
    }
}
