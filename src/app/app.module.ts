import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { MainService } from './main.service';

import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { PositionSelectorComponent } from './position-selector/position-selector.component';
import { MoveComponent } from './move/move.component';
import { MatrixComponent } from './matrix/matrix.component';
import { CellComponent } from './cell/cell.component';
import { MoverComponent } from './mover/mover.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';
import { StepsListComponent } from './steps-list/steps-list.component';
import { BoardComponent } from './board/board.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreflopComponent } from './preflop/preflop.component';

const appRoutes: Routes = [
  { path: 'preflop', component: PreflopComponent },
  { path: 'board', component: BoardComponent },
  { path: '',
    redirectTo: '/preflop',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ChallengeComponent,
    PositionSelectorComponent,
    MoveComponent,
    MatrixComponent,
    CellComponent,
    MoverComponent,
    CardSelectorComponent,
    StepsListComponent,
    BoardComponent,
    PreflopComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
    //  { enableTracing: true } // <-- debugging purposes only
    )    
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
