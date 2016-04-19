import {Http} from 'angular2/http';
import {Injectable} from "angular2/core";
import 'rxjs/Rx';


@Injectable()
export class TwitterService {
    
    constructor(private http: Http) {}

    getLatestTweets(searchString) {
        const endpoint = 'http://localhost:8081/tweets/' + searchString;

        return this.http
            .get(endpoint)
            .map(res => res.json().statuses)
    }
    
}