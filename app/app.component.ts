import { WorkoutRootPage } from './../pages/workout-root/workout-root';
import { Component, ViewChild } from '@angular/core';
import { CheckNetwork } from './check-network';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';
import { DietPage } from '../pages/diet/diet';
import { WorkoutCollection } from '../workout-collection';
import { WorkoutService } from './workout.service';


@Component({
  templateUrl: 'app.html',
  providers: [CheckNetwork, WorkoutCollection, WorkoutService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  workoutList: any;
  // make HelloIonicPage the root (or first) page
  rootPage: any = WorkoutRootPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public checkNW: CheckNetwork,
    public workoutCollection: WorkoutCollection,
    public workoutService: WorkoutService
  ) {
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

      setTimeout(() => {
        console.log(this.checkNW.checkNetwork());
      }, 3000);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.setLocalStorage();
    });
  }

  setLocalStorage() {
    if (!localStorage.getItem('workout-collection')) {
      localStorage.setItem('workout-collection', JSON.stringify(this.workoutCollection.WorkoutList))
    }
    this.workoutService.getWorkoutList().subscribe(res => {
      if (res.length) {
        if (res[0]['workout-collection'] !== "undefined") {
          this.workoutList = JSON.stringify(res[0]['workout-collection']);
          localStorage.setItem('lookupid', res[0]['_id']['$oid'])
          if (localStorage.getItem('workout-collection')) {
            if (this.workoutList.length > localStorage.getItem('workout-collection').length) {
              localStorage.removeItem('workout-collection');
              localStorage.setItem('workout-collection', this.workoutList);
            } else {
              if (this.workoutList.length < localStorage.getItem('workout-collection').length) {
                this.workoutService.addWorkoutList(localStorage.getItem('workout-collection'), res[0]['_id']['$oid']).subscribe((res) => {
                  console.log(res)
                }, error => {
                  console.log(error)
                })
              }
            }
          } else {
            localStorage.setItem('workout-collection', this.workoutList);
          }
        }
      } else {
        this.workoutService.addWorkoutList(localStorage.getItem('workout-collection'), res[0]['_id']['$oid']).subscribe((res) => {
          console.log(res)
        }, error => {
          console.log(error)
        })
      }
    }, error => {
      console.log(error);
    })
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
