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
import { AnimationEvent } from '@angular/animations/src/animation_event';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('showTrigger', [
      transition('* => *', [
        animate(500, keyframes([
          style({
            transform: "rotateY(90deg)",
            offset: 0
          }),
          style({
            transform: "rotateY(0deg)",
            offset: 1.0
          })
        ]))
      ]),
    ]),
    trigger('hideTrigger', [
      transition('* => *', [
        animate(500, keyframes([
          style({
            transform: "rotateY(0deg)",
            offset: 0
          }),
          style({
            transform: "rotateY(90deg)",
            offset: 1.0
          })
        ]))
      ]),
    ])
  ]
})

export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() selected: boolean;
  picPath: string;

  constructor() {
    this.picPath = Card.emptyPath();
  }

  ngOnInit() {
  }

  animationDone($event: AnimationEvent): void {
    this.picPath = this.card.picPath;
  }

}


