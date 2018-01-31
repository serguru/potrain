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

@Component({
  selector: 'app-steps-list',
  templateUrl: './steps-list.component.html',
  styleUrls: ['./steps-list.component.css'],
  animations: [

    trigger('visibility', [
      state("true", style({
        height: '*',
        opacity: 1,
      })),
      state('false', style({
        height: '0',
        opacity: 0,
      })),
      transition('true <=> false', animate('300ms'))
    ])
  ]
})

export class StepsListComponent implements OnInit {

  @Input() challenge: Challenge;
  @Input() visible: boolean;

  constructor() { }

  ngOnInit() {
  }

}
