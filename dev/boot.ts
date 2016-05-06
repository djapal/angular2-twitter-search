import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from "./app.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {TwitterService} from "./twitter.service";

bootstrap(AppComponent, [HTTP_PROVIDERS, TwitterService]);
