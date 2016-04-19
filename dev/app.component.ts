import {Component} from 'angular2/core';
import {OnInit} from "angular2/core";
import {TwitterService} from "./twitter.service";
import {TweetComponent} from "./tweet.component";

@Component({
    selector: 'my-app',
    template: `
       <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Angular 2 Twitter Search</a>
          </div>
        </div>
      </nav>
        <div class="row">
          <div class="col-md-4">
            <input #searchString type="text" [value]="searchFor" (keyup)="searchAgain($event, searchString.value)" class="form-control" style="margin-bottom: 20px"/>
           </div> 
        </div>
        <div class="row">
            <div><tweet *ngFor="#tweet of tweets | async" [tweetObj]="tweet" [search-for]="searchFor"></tweet></div>
        </div>   
    `,
    directives: [TweetComponent]
})
export class AppComponent implements OnInit {

    tweets = null;
    searchFor: string = 'angular 2';

    constructor(private twitterService: TwitterService) {
    }

    ngOnInit():any {
        this.tweets = this.twitterService.getLatestTweets(this.searchFor);
    }

    searchAgain(event, str: string) {
        if (event.keyCode == 13) {
            this.searchFor = str;
            this.tweets = this.twitterService.getLatestTweets(str);
        }
    }

}
