import { EditWorkoutPage } from './../pages/edit-workout/edit-workout';
import { AddWorkoutListPage } from './../pages/add-workout-list/add-workout-list';
import { ListBodyPartsPage } from './../pages/list-body-part/list-body-part';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WorkoutRootPage } from '../pages/workout-root/workout-root';
import { DietPage } from '../pages/diet/diet';
import { AddWorkoutPage } from '../pages/add-workout/add-workout';
import {ListWorkoutPage} from "../pages/list-workout/list-workout";

@NgModule({
  declarations: [
    MyApp,
    WorkoutRootPage,
    DietPage,
    ListWorkoutPage,
    AddWorkoutPage,
    ListBodyPartsPage,
    AddWorkoutListPage,
    EditWorkoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WorkoutRootPage,
    DietPage,
    ListWorkoutPage,
    AddWorkoutPage,
    ListBodyPartsPage,
    AddWorkoutListPage,
    EditWorkoutPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
