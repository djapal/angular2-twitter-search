import {Component, Input} from '@angular/core';

@Component({
    selector: 'tweet',
    template: `
            <div class="media tweet">
             <div class="media-left">
                <a href="#">
                  <img class="media-object" src="{{tweet.user.profile_image_url}}" alt="...">
                </a>
              </div>
              <div class="media-body">
                <div class="media-heading">
                <a target="_blank" href="https://twitter.com/{{tweet.user.screen_name}}">
                    <strong class="fullname">{{tweet.user.name}}</strong>
                </a>
                <span class="username"> @{{tweet.user.screen_name}} - {{tweet.created_at}}</span></div>
                <span [innerHTML]="getText()"></span>
                <img *ngIf="tweet.entities.media!= null" src="{{tweet.entities.media[0].media_url}}"/>
              </div>
            </div>  
    `,
})
export class TweetComponent {

    @Input('tweetObj')   tweet;
    @Input('search-for') searchFor;

    getText() {
        let newText = this.tweet.text;

        newText = newText.replace(new RegExp(`(${this.searchFor})`, 'gi'), `<strong>$1</strong>`);

        this.tweet.entities.hashtags.forEach((tag) => {
            newText = newText.replace(`#${tag.text}`, `<a href='https://twitter.com/hashtag/${tag.text}?src=hash' target="_blank">#${tag.text}</a>`)
        });

        this.tweet.entities.urls.reverse().forEach((url) => {
            newText = newText.replace(url.url, `<a href='${url.expanded_url}' target="_blank">${url.display_url}</a>`)
        });

        return newText;
    }

}
