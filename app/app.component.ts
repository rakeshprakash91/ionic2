import { BodyParts } from './../body-part';
import { WorkoutRootPage } from './../pages/workout-root/workout-root';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';
import { DietPage } from '../pages/diet/diet';
import { WorkoutCollection } from '../workout-collection';
import { WorkoutService } from './workout.service';


@Component({
  templateUrl: 'app.html',
  providers: [WorkoutCollection, WorkoutService, BodyParts]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  workoutList: any;
  parts: any;
  // make HelloIonicPage the root (or first) page
  rootPage: any = WorkoutRootPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public workoutCollection: WorkoutCollection,
    public workoutService: WorkoutService,
    public part: BodyParts
  ) {
    this.parts = part.parts;
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Workout Page', component: WorkoutRootPage },
      // { title: 'Add Workout', component: AddWorkoutPage },
      { title: 'Diet', component: DietPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.getCount();
      this.setLocalStorage();
      this.saveWorkouts();
    });
  }

  getCount() {
    for (let i = 0; i < this.parts.length; i++) {
      this.workoutService.getWorkoutCount(this.parts[i].toLowerCase()).subscribe(count => {
        localStorage.setItem(this.parts[i] + "Count", count);
      })
    }
  }

  setLocalStorage() {
    if (!localStorage.getItem('workout-collection')) {
      localStorage.setItem('workout-collection', JSON.stringify(this.workoutCollection.WorkoutList))
    }
    this.workoutService.getWorkoutList().subscribe(res => {
      if (res.length) {
        if (res[0]['workout-collection'] !== "undefined") {
          this.workoutList = JSON.stringify(res[0]['workout-collection']);
          localStorage.setItem('lookupid', res[0]['_id']['$oid']);
          if (this.workoutList.length > localStorage.getItem('workout-collection').length) {
            localStorage.removeItem('workout-collection');
            localStorage.setItem('workout-collection', this.workoutList);
          } else {
            if (this.workoutList.length < localStorage.getItem('workout-collection').length) {
              this.updateWorkoutList();
            }
          }
        }
      } else {
        this.updateWorkoutList();
      }
    }, error => {
      console.log(error);
    })
  }

  updateWorkoutList() {
    //update the workout collection
    var list = {
      "workout-collection" : JSON.parse(localStorage.getItem('workout-collection'))
    }
    this.workoutService.addWorkoutList(JSON.stringify(list), localStorage.getItem('lookupid')).subscribe((res) => {
      console.log(res)
    }, error => {
      console.log(error)
    })


  }

  saveWorkouts() {
    var hasError = false;
    //add new wokrouts to db
    for (let i = 0; i < this.parts.length; i++) {
      if (localStorage.getItem(this.parts[i])) {
        var details = JSON.parse(localStorage.getItem(this.parts[i]));
        // for (let j = 0; j < details.length; j++) {
        this.workoutService.addWorkout(this.parts[i].toLowerCase(), details).subscribe(res => {
          console.log('localSave ', res);

          //check value of n & compare it with localstorage object if equal remove it
        }, (error) => {
          hasError = true;
          localStorage.setItem("hasError", "true");
        })
        // }
      }
    }

    localStorage.setItem("hasError", "false");
    setTimeout(this.clearLocalStorage, 30000, hasError,this.parts)

  }

  clearLocalStorage(errorStatus,parts) {
    if (!errorStatus) {
      for (let i = 0; i < parts.length; i++) {
        if (localStorage.getItem(parts[i])) {
          localStorage.removeItem(parts[i]);
        }
      }
    }
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
