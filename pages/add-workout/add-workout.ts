import { ListBodyPartsPage } from './../list-body-part/list-body-part';
import { WorkoutCollection } from './../../workout-collection';
import { BodyParts } from './../../body-part';
import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { WorkoutService } from "../../app/workout.service";
import { AlertPage } from "../alerts/alert";


@Component({
    selector: 'add-workout',
    templateUrl: 'add-workout.html',
    providers: [WorkoutService, AlertPage, BodyParts, WorkoutCollection],
    styles: ["add-workout"]
})
export class AddWorkoutPage {
    bodyPart: string;
    exerciseList: any;
    field: any = {};
    saveData: any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, private workoutService: WorkoutService,
        private alert: AlertPage,
        private workoutCollection: WorkoutCollection,
        public loading: LoadingController) {
        this.bodyPart = navParams.get("bodyPart");
        this.exerciseList = JSON.parse(localStorage.getItem('workout-collection'))[this.bodyPart]['workout'];
        for (let key in Object.keys(this.field)) {
            this.field[key] = ""
        }
    }

    loadSavingPopup = this.loading.create({
        spinner: "bubbles",
        content: 'Saving Workout Details...'
    });

    onSubmit() {
        this.loadSavingPopup.present();
        this.saveData = {};
        this.saveData.date = new Date();
        for (let i = 0; i < this.exerciseList.length; i++) {
            this.saveData[this.exerciseList[i]] = this.field[i] || 0;
        }
        this.workoutService.addWorkout(this.bodyPart.toLowerCase(), this.saveData).subscribe(res => {
            this.alert.showAlert('Success', 'Added Workout Successfully!!!');
            this.loadSavingPopup.dismiss();
        }, (error) => {
            this.loadSavingPopup.dismiss();
            this.alert.showAlert('Error', 'Please try after some time!');
        },
            () => {
                this.navCtrl.setRoot(ListBodyPartsPage, {}, {
                    animate: true,
                    animation: "ios-transition",
                    direction: "forward",
                    duration: 300
                });
            })
    }
}
