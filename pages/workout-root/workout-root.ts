import { AddWorkoutListPage } from './../add-workout-list/add-workout-list';
import { ListBodyPartsPage } from './../list-body-part/list-body-part';
import { Component, } from '@angular/core';
// import { ListWorkoutPage } from "../list-workout/list-workout";
// import { AddWorkoutPage } from "../add-workout/add-workout";

@Component({
  templateUrl: 'workout-root.html',
})
export class WorkoutRootPage {


  workouts: any;
  selectedWorkout;
  tab1Root: any = ListBodyPartsPage;
  tab2Root: any = AddWorkoutListPage;
  constructor() {

  }


}
