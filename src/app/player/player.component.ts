import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import * as Enum from '../enum';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() player: Player;

  public disabled: boolean = false;

  public get action(): string {
    return this.player && this.player.move ? Enum.Action[this.player.move] : "";
  }

  constructor() { }

  ngOnInit() {
  }

}
