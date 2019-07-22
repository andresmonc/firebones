import {Component, OnInit, AfterViewInit} from "@angular/core";
import {DynamoDBService} from "../../service/ddb.service";


@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './episodes-page.component.html',
})
export class EpisodesPageComponent implements OnInit {

  player;

  constructor(public ddb: DynamoDBService) {
    console.log("in Episodes Page");

}

ngAfterViewInit() {

  const doc = (<any>window).document;
const playerApiScript = doc.createElement('script');
playerApiScript.type = 'text/javascript';
playerApiScript.src = 'https://www.youtube.com/iframe_api';
doc.body.appendChild(playerApiScript);
}


ngOnInit() {

  (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '500px',
        width: '1000px',
        videoId: 'HmAsUQEFYGI',
        events: {
          'onReady': (event) => { 
              console.log("ARE WE READY FOR VID")
              this.onPlayerReady(event); }
              ,
          'onStateChange': (event) => { this.onPlayerStateChange(event); }
        },
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          // playlist: 'UG3sfZKtCQI,ALZHF5UqnU4,x9ZkC3OgI78',
          rel: 0,
          showInfo: 0
        }
      });
    };

}

// The API calls this function when the player's state changes.
onPlayerStateChange(event) {
console.log("Vid status number:", event.data);
  if (event.data == 0){
    console.log('VIDEO HAS ENDED')
    this.ddb.updateUserContentWatched();
    this.ddb.updateUserContentCount(325);
  }
}

// The API will call this function when the video player is ready
onPlayerReady(event) {
console.log("what is this", event);
event.target.playVideo();
}

}
