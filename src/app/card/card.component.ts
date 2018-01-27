import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('visibility', [
      transition('* => *', [
        animate(700, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]),
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() selected: boolean;

  constructor() { }

  ngOnInit() {
  }

}


