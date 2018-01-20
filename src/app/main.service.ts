import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Matrix } from './matrix';
import { Challenge } from './challenge';
import * as Enum from './enum';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pocket } from './pocket';
import { Move } from './move';

@Injectable()
export class MainService {

  private pocketSource = new BehaviorSubject<Pocket>(null);
  public currentPocket = this.pocketSource.asObservable();

  private challengeSource = new BehaviorSubject<Challenge>(null);
  public currentChallenge = this.challengeSource.asObservable();

  private filePathSource = new BehaviorSubject<string>(null);
  public currentFilePath = this.filePathSource.asObservable();

  private moveSource = new BehaviorSubject<Move>(null);
  public currentMove = this.moveSource.asObservable();

  private matrixVisibilitySource = new BehaviorSubject<boolean>(null);
  public currentMatrixVisibility = this.matrixVisibilitySource.asObservable();

  appsettings: any;

  constructor(private http: HttpClient) {

  }

  changePocket(pocket: Pocket) {
    this.pocketSource.next(pocket);
    this.moveSource.next(null);
  }

  changeChallenge(challenge: Challenge) {
    this.challengeSource.next(challenge);
  }

  changeFilePath(filePath: string) {
    this.filePathSource.next(filePath);
  }

  changeMove(move: Move) {
    this.moveSource.next(move);
  }

  changeMatrixVisibility(visible: boolean) {
    this.matrixVisibilitySource.next(visible);
  }

  public getAppSettins(success?: Function, error?: Function): void {
    this.http.get("assets/appsettings.json")
      .subscribe((settings: any) => {
        this.appsettings = settings;
        if (success) {
          success(settings);
        }
      }, 
      (err) => { 
        if (error) { 
          error(err); 
        } 
      });
  }

  getFile(filePath: string): Observable<string> {
    return this.http.get("assets/challenge/" + filePath,{ responseType: 'text' });
  }
}
