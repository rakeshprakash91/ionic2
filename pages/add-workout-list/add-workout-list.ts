import { WorkoutCollection } from './../../workout-collection';
import { BodyParts } from './../../body-part';
import { AddWorkoutPage } from './../add-workout/add-workout';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertPage } from "../alerts/alert";
import { WorkoutService } from '../../app/workout.service';

@Component({
  selector: 'add-workout-list',
  templateUrl: 'add-workout-list.html',
  providers: [AlertPage, BodyParts, WorkoutCollection, WorkoutService]
})
export class AddWorkoutListPage {

  workout: any;
  bodyPart: any;
  partSelected: any;
  workoutName: any;
  constructor(private workoutCollection: WorkoutCollection, private part: BodyParts, private alert: AlertPage, public navCtrl: NavController, public navParams: NavParams, public workoutService: WorkoutService) {
    this.bodyPart = part.parts;
  }

  onSubmit() {
    var currList = JSON.parse(localStorage.getItem('workout-collection'));
    currList[this.partSelected]['workout'].push(this.workoutName);
    localStorage.removeItem('workout-collection');
    localStorage.setItem('workout-collection', JSON.stringify(currList));
    var id = localStorage.getItem('lookupid');
    this.workoutService.addWorkoutList(localStorage.getItem('workout-collection'), id).subscribe((res) => {
      console.log(res)
      this.workoutName = "";
      this.partSelected = ""
    }, error => {
      console.log(error)
    })
  }
}
