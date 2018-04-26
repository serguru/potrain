import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Challenge } from '../challenge';
import { MainService } from '../main.service';
import { Step } from '../step';
import * as Enum from '../enum';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})

export class ChallengeComponent implements OnInit {

  private challenges: Array<Challenge>;

  private _currentChallenge: Challenge;


  get currentChallenge(): Challenge {
    return this._currentChallenge;
  }

  set currentChallenge(value: Challenge) {
    if (this._currentChallenge == value) {
      return;
    }

    let previousPosition: Enum.Position = this._currentChallenge ? this._currentChallenge.steps[0].position : null;

    this._currentChallenge = value;

    if (previousPosition) {
      this._currentChallenge.steps[0].position = previousPosition;
    }

    this.mainService.changeChallenge(this.currentChallenge);
  }

  constructor(private mainService: MainService) {
    this.challenges = [];
  }

  setChallenges(challenges: any): void {
    this.challenges.length = 0;

    for (let i: number = 0; i < challenges.length; i++) {
      let challenge: Challenge = new Challenge(challenges[i], (filePath: string) => {
        this.mainService.changeFilePath(filePath);
      });
      this.challenges.push(challenge);
    }
  }

  ngOnInit() {
    this.mainService.getAppSettins((settings: any) => {
      this.setChallenges(settings.challenges);
      this.currentChallenge = this.challenges[0];
    });
  }

}
