import { ListWorkoutPage } from './../list-workout/list-workout';
import { AddWorkoutPage } from './../add-workout/add-workout';
import { BodyParts } from './../../body-part';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { WorkoutCollection } from './../../workout-collection';

@Component({
  templateUrl: 'list-body-part.html',
  providers: [BodyParts]
})
export class ListBodyPartsPage {
  parts: any;
  constructor(private bParts: BodyParts, public navCtrl: NavController, public navParams: NavParams) {
    this.parts = this.bParts.parts;
    // this.workoutCollection = JSON.parse(localStorage.getItem('workout-collection'));
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

  partSelected(e, part) {
    this.navCtrl.push(AddWorkoutPage, {
      collection: JSON.parse(localStorage.getItem('workout-collection'))[part].workout,
      bodyPart: part
    }), {
        animate: true,
        animation: "ios-transition",
        direction: "forward",
        duration: 300
      }
  }

}