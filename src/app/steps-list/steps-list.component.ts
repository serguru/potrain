import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { Challenge } from '../challenge';
import { MainService } from '../main.service';

@Component({
  selector: 'app-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.css'],
  animations: [

    trigger('visibility', [
      transition('void => *', animate('300ms',
        keyframes([
          style({ height: 0, opacity: 0, offset: 0 }),
          style({ height: '*', opacity: 1, offset: 1 })
        ])
      )),

      transition('* => void', animate('300ms', style({
        height: '0',
        opacity: 0,
      })))
    ])
  ]
})

export class StepsListComponent implements OnInit {

  @Input() challenge: Challenge;
  @Input() visible: boolean;

  constructor(private mainService: MainService) {
  }

  ngOnInit() {
  }

}
