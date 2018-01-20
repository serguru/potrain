import { Move } from '../move';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { Pocket } from '../pocket';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css']
})
export class MoveComponent implements OnInit {

  @Input() move: Move;

  @Input() selected: boolean;
  
  disabled: boolean;

  constructor(private mainService: MainService) { 
  }

  ngOnInit() {
    this.mainService.currentPocket
      .subscribe(pocket => {
        this.disabled = !Pocket.ok(pocket);
      });
  }

  setSelected(): void {
    this.mainService.changeMove(this.move);
  }

}

