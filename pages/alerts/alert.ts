import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertPage {
    constructor(public alertCtrl: AlertController) {
    }

    showAlert(status : string , msg : string ) {
            let alert = this.alertCtrl.create({
                title: status,
                subTitle: msg,
                buttons: ['OK']
            });
        alert.present();
    }
}