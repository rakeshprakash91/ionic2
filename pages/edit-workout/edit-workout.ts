import { ListWorkoutPage } from './../list-workout/list-workout';
import { WorkoutCollection } from './../../workout-collection';
import { BodyParts } from './../../body-part';
import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { WorkoutService } from "../../app/workout.service";
import { AlertPage } from "../alerts/alert";


@Component({
    selector: 'edit-workout',
    templateUrl: 'edit-workout.html',
    providers: [WorkoutService, AlertPage, BodyParts, WorkoutCollection],
    // styles: ["add-workout"]
})
export class EditWorkoutPage {
    bodyPart: string;
    exerciseList: any = [];
    field: any = {};
    saveData: any = {};
    workout: any;
    x: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams, private workoutService: WorkoutService,
        private alert: AlertPage,
        private workoutCollection: WorkoutCollection,
        public loading: LoadingController) {
        this.workout = navParams.get("workout");
        this.bodyPart = navParams.get("part");
    }

    ngAfterViewInit() {
        for (let i = 0; i < this.workout.detail.length; i++) {
            this.exerciseList.push(this.workout.detail[i].name);
            this.field[i] = this.workout.detail[i].reps;
        }
    }

    loadUpdatingPopup = this.loading.create({
        spinner: "bubbles",
        content: 'Updating Workout Details...'
    });

    onSubmit() {
        this.loadUpdatingPopup.present();
        this.saveData = {};
        this.saveData.date = new Date();
        for (let i = 0; i < this.exerciseList.length; i++) {
            this.saveData[this.exerciseList[i]] = this.x[i] || this.field[i];
        }
        console.log(this.saveData, this.workout._id.$oid)
        this.workoutService.updateWorkout(this.bodyPart.toLowerCase(), this.saveData, this.workout._id.$oid).subscribe(res => {
            this.loadUpdatingPopup.dismiss();
            this.alert.showAlert('Success', 'Updated Workout Successfully!!!');
        }, (error) => {
            this.loadUpdatingPopup.dismiss();
            this.alert.showAlert('Error', 'Please try after some time!');
        },
            () => {
                this.navCtrl.pop(ListWorkoutPage)
                this.navCtrl.pop(this.navCtrl.getActive().component)
                this.navCtrl.push(ListWorkoutPage, {
                    part: this.bodyPart
                }, {
                        animate: true,
                        animation: "ios-transition",
                        direction: "forward",
                        duration: 300
                    });
            })
    }
}
