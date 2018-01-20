/*
 * events to be emitted
 * 
 * reset - current index is set to -1, postions array is empty
 * 
 * loop through questions (
 * 
 * asked a question - current index is set to current question's index, positions array does not have a value under the current index
 * 
 * received an answer - positions array receives a value under the current index then current index increased by one
 * 
 * )
 * 
 * finished - current index is set to the latest possible plus one
 * 
 */


// import { Challenge } from './challenge';
// import * as Enum from './enum';

// export class Scenario {

//     public challenge: Challenge; 
//     public positions: Array<Enum.Position> = [];
//     private _currentIndex: number;

//     public get currentIndex(): number {
//         return this._currentIndex;
//     }

//     constructor() {
//     }
    
//     public get prefix(): string {
//         let result: string = "";

//         for (let i: number = 0; i < this.positions.length; i++) {
//             if (!this.positions[i]) {
//                 break;
//             }
//             result += this.positions[i] + "_";
//         }

//         return result;
//     }

//     setNextIndex(): void {
//         if (!this._currentIndex) {
//             this._currentIndex = 0;
//             return;
//         }

//         if (this.currentIndex >= this.challenge.questions.length) {
//             return;
//         }

//         this._currentIndex++;
//     }

//     getCurrentQuestion(): string {
//         if (this.currentIndex >= 0 && this.currentIndex < this.challenge.questions.length) {
//             return this.challenge.questions[this.currentIndex];
//         }
//         return "";
//     }

//     setNextPosition(position: Enum.Position): void {
//         if (this.currentIndex >= this.challenge.questions.length) {
//             return;
//         }
//         this.positions.push(position);
//         this.setNextIndex();
//     }

// }
