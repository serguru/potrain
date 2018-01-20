import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { MainService } from './main.service';

import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';
import { TableComponent } from './table/table.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { PositionSelectorComponent } from './position-selector/position-selector.component';
import { MoveComponent } from './move/move.component';
import { MatrixComponent } from './matrix/matrix.component';
import { CellComponent } from './cell/cell.component';
import { PocketComponent } from './pocket/pocket.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    TableComponent,
    ChallengeComponent,
    PositionSelectorComponent,
    MoveComponent,
    MatrixComponent,
    CellComponent,
    PocketComponent,
    CardSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
