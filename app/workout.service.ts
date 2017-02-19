import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class WorkoutService {
    apiKey = "-c3C0o-K675OK01VBZsBMYRRQx4DV8Bd";
    serviceUrl = "https://api.mlab.com/api/1/databases/workout/collections/";
    constructor(private http: Http) {
    }
    getWorkout(workoutFor : any) {
        return this.http.get(this.serviceUrl +workoutFor+"?apiKey="+this.apiKey).map(res => res.json())
    }
    addWorkout(workoutFor : any, data : any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.serviceUrl +workoutFor+"?apiKey="+ this.apiKey, JSON.stringify(data), { headers: headers })
            .map(res => res.json())
    }
    getWorkoutList() {
        return this.http.get(this.serviceUrl +"workoutlist?apiKey="+this.apiKey).map(res => res.json())
    }
    addWorkoutList(data : any, id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.serviceUrl +"workoutlist/"+id+"?apiKey="+ this.apiKey, data, { headers: headers })
            .map(res => res.json())
    }
    deleteWorkout(workoutFor : any, workoutId : any) {
        return this.http.delete(this.serviceUrl +workoutFor + '/' + workoutId + "?apiKey=" + this.apiKey).map(res => res.json())
    }
    updateWorkout(workoutFor : any, data : any, workoutId : any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.serviceUrl +workoutFor + '/' + workoutId + "?apiKey=" + this.apiKey, JSON.stringify(data), { headers: headers }).map(res => res.json())
    }
}
