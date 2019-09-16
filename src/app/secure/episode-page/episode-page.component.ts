import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from "../../service/ddb.service";
import { EpisodeDetailsService } from "../../service/episode-details.service"

@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.css']
})
export class EpisodePageComponent implements OnInit {

  public id = this.route.snapshot.paramMap.get('id')
  public episodeTitle: String;
  public episodeDesc:  String;
  player;

  constructor(
    private route: ActivatedRoute,
    public ddb: DynamoDBService,
    public episodeDetailsService :EpisodeDetailsService
  ) {
    console.log("in Episode Page");

  }

  ngAfterViewInit() {

    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }


  ngOnInit() {

    this.getEpisodeDetails(this.id);

    //seriously? can this be moved to it's own function?
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '500px',
        width: '1000px',
        videoId: 'HmAsUQEFYGI',
        events: {
          'onReady': (event) => {
            console.log("ARE WE READY FOR VID")
            this.onPlayerReady(event);
          }
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
    if (event.data == 0) {
      console.log('VIDEO HAS ENDED')
      //if content count is less than 2
      this.ddb.updateUserContentWatched();
    }
  }

  // The API will call this function when the video player is ready
  onPlayerReady(event) {
    console.log("what is this", event);
    event.target.playVideo();
  }

  getEpisodeDetails(id){
    let obj = this.episodeDetailsService.episodeLookup(id)
    for (var key in obj) {
      if (key == 'episodeTitle'){
        this.episodeTitle = obj[key]
      }
      if (key == 'episodeDesc'){
        this.episodeDesc = obj[key]
      }
    }
  }

}
