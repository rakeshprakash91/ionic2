import { ListWorkoutPage } from './../list-workout/list-workout';
import { BodyParts } from './../../body-part';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'list-body-part.html',
  providers: [BodyParts]
})
export class ListBodyPartsPage {
  parts: any;
  constructor(private bParts: BodyParts, public navCtrl: NavController, public navParams: NavParams) {
    this.parts = this.bParts.parts;
  }

  selectBodyPart(e, part) {
    this.navCtrl.push(ListWorkoutPage, {
      part: part
    }, {
        animate: true,
        animation: "ios-transition",
        direction: "forward",
        duration: 300
      });
  }

}