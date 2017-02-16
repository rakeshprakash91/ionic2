import { WorkoutCollection } from './../../workout-collection';
import { BodyParts } from './../../body-part';
import { AddWorkoutPage } from './../add-workout/add-workout';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertPage } from "../alerts/alert";

@Component({
  selector: 'add-workout-list',
  templateUrl: 'add-workout-list.html',
  providers: [AlertPage, BodyParts, WorkoutCollection]
})
export class AddWorkoutListPage {

  workout: any;
  bodyPart: any;
  constructor(private workoutCollection: WorkoutCollection, private part: BodyParts, private alert: AlertPage, public navCtrl: NavController, public navParams: NavParams) {
    this.bodyPart = part.parts;
  }

  partSelected(e, part) {

    this.navCtrl.push(AddWorkoutPage, {
      collection: this.workoutCollection.WorkoutList[part].workout,
      bodyPart: part
    }), {
        animate: true,
        animation: "ios-transition",
        direction: "forward",
        duration: 300
      };
  }
}
