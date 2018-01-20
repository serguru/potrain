import { Step } from '../step';
import { Component, Input, OnInit } from '@angular/core';
import * as Enum from '../enum';

@Component({
  selector: 'app-position-selector',
  templateUrl: './position-selector.component.html',
  styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent implements OnInit {

  @Input() step: Step;
  
  constructor() { }

  ngOnInit() {
  }

  setPosition(position: Enum.Position): void {
    if (this.step.positions.indexOf(position) < 0) {
      return;
    }
    this.step.position = position;
  }

  get positions(): Array<any> {
    
    let result: Array<any> = [];
    
    for(let i:number = 1; i <= 6; i++) {
      let p: any = {};
      p.position = i;
      p.name = Enum.Position[i];
      p.disabled = this.step.positions.indexOf(i) < 0 || this.step.disabled;
      result.push(p);
    }
    return result;
  }

}
