import { EditWorkoutPage } from './../edit-workout/edit-workout';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { WorkoutService } from '../../app/workout.service';
import { AlertPage } from "../alerts/alert";

@Component({
  selector: 'list-workout',
  templateUrl: 'list-workout.html',
  providers: [WorkoutService, AlertPage]
})
export class ListWorkoutPage {
  workouts: any = [];
  selectedWorkout;
  part: string;
  workout: any = {}
  workoutDetail: any = [];
  details: any = {};

  constructor(private workoutService: WorkoutService, private alert: AlertPage, public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, private alertCtrl: AlertController) {
    // this.selectedWorkout = navParams.get('workout');
    this.part = navParams.get('part');
  }

  loadDetailsPopup = this.loading.create({
    spinner: "bubbles",
    content: 'Loading Workout Details...'
  });

  loadDeletePopup = this.loading.create({
    spinner: "bubbles",
    content: 'Deleting Workout...'
  });

  ngOnInit() {
    this.loadDetailsPopup.present();
    this.workoutService.getWorkout(this.part.toLowerCase()).subscribe(res => {
      this.loadDetailsPopup.dismiss();
      this.workouts = [];
      for (let i = 0; i < res.length; i++) {
        this.workoutDetail = [];
        this.details = {};
        for (let j in Object.keys(res[i])) {
          this.workout = {};
          if (Object.keys(res[i])[j] != "date" && Object.keys(res[i])[j] != "_id") {
            this.workout.name = Object.keys(res[i])[j];
            this.workout.reps = res[i][this.workout.name];
            this.workoutDetail.push(this.workout);
          } else if (Object.keys(res[i])[j] == "date") {
            this.details.date = res[i][Object.keys(res[i])[j]];
          } else {
            this.details._id = res[i][Object.keys(res[i])[j]];
          }
        }
        this.details.detail = this.workoutDetail;
        this.workouts.push(this.details);
        this.workouts.reverse();
      }
    },
      error => {
        this.navCtrl.pop(this.navCtrl.getActive().component)
        this.loadDetailsPopup.dismiss();
        this.alert.showAlert('Error', "Please try again after sometime!!!");
      })
  }

  deleteWorkout(workout) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Workout?',
      message: 'Do you want to delete this workout?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.loadDeletePopup.present();
            this.workoutService.deleteWorkout(this.part.toLowerCase(), workout._id.$oid).subscribe(res => {
              this.loadDeletePopup.dismiss();
              this.alert.showAlert('Success', 'Deleted Workout Successfully!!!');
            },
              error => {
                this.loadDeletePopup.dismiss();
                this.alert.showAlert('Error', 'Please try after some time!');
              },
              () => {
                this.navCtrl.pop(this.navCtrl.getActive().component);
                this.navCtrl.push(this.navCtrl.getActive().component, {
                  part: this.part
                }, {
                    animate: true,
                    animation: "ios-transition",
                    direction: "forward",
                    duration: 300
                  });
              })
          }
        }
      ]
    });
    confirm.present();
  }

  editWorkout(workout) {
    // this.navCtrl.pop(this.navCtrl.getActive().component);
    this.navCtrl.push(EditWorkoutPage, {
      workout: workout,
      part: this.part
    }, {
        animate: true,
        animation: "ios-transition",
        direction: "forward",
        duration: 300
      });
  }
}
