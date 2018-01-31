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
    trigger("flip", [
      state("true", style({transform: "rotateY(0.25turn)"})),    
      state("false", style({transform: "rotateY(0)"})),    
      transition('true <=> false', animate('150ms'))
      ]
    )
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

  get flipped(): boolean {
    return this.card && this.card.picPath !== this.picPath;
  }



}


