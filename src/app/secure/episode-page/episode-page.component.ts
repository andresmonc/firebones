import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from '../../service/ddb.service';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';


@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.css']
})
export class EpisodePageComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  public id = this.route.snapshot.paramMap.get('id');
  public episodeTitle: string = this.episodeDetailsService.getEpisodeTitle(this.id);
  public episodeDesc: string = this.episodeDetailsService.getEpisodeDesc(this.id);
  public episodeContent: JSON = this.episodeDetailsService.getEpisodeContentArray(this.id);
  public contentCount;
  public contentWatched = this.ddb.getLocalStorageContentWatched();
  public clickInContentKey;
  public episodeVideoId = '';
  public timelineEpisodeCount;
  player;

  constructor(
    private route: ActivatedRoute,
    public ddb: DynamoDBService,
    public episodeDetailsService: EpisodeDetailsService,
    private loadingScreenService: LoadingScreenService
  ) {
    console.log('in Episode Page');
    this.loadingScreenService.startLoading();
  }

  ngOnInit() {
    this.ddb.getUserContent().then((data => {
      console.log('this is the resolved contentCount!!!', data);
      console.log('getUserObject function execution done!');
      this.contentCount = data;

      (window as any).onYouTubeIframeAPIReady = () => {
        console.log('Youtube Initalized');
        this.player = new (window as any).YT.Player('player', {
          height: '100%',
          width: '100%',
          events: {
            onReady: (event) => {
              console.log('ARE WE READY FOR VID');
              this.loadingScreenService.stopLoading();
              this.onPlayerReady(event);
            },
            onStateChange: (event) => { this.onPlayerStateChange(event); }
          },
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showInfo: 0
          }
        });
      };

      this.timelineEpisodeCount = this.getTimelineEpisodeCount();
      const doc = (window as any).document;
      const playerApiScript = doc.createElement('script');
      playerApiScript.type = 'text/javascript';
      playerApiScript.src = 'https://www.youtube.com/iframe_api';
      doc.body.appendChild(playerApiScript);
    }));
  }

  isEven(num) { return !(num % 2); }

  setVideoId(epvideoId, contentKey) {
    this.player.loadVideoById(epvideoId);
    console.log('this is the content key clickd in', contentKey);
    this.clickInContentKey = contentKey;
  }

  getTimelineEpisodeCount() {
    let timelineCount = 0;
    const lastKeyCount = Object.keys(this.episodeContent).length;

    // tslint:disable-next-line:forin
    for (const key in this.episodeContent) {
      timelineCount++;
      if (key === this.contentCount) {
        return timelineCount;
      }
    }
    console.log("last key count", lastKeyCount);
    return lastKeyCount;
  }

    // The API calls this function when the player's state changes.
    onPlayerStateChange(event) {
      if (event.data === 0 && this.contentWatched === 'FALSE' && this.clickInContentKey === this.contentCount) {
        console.log('UPDATING CONTENT WATCH TO TRUE ONCE ONLY');
        // if content count is less than 2
        this.contentWatched = 'TRUE';
        this.ddb.setLocalStorageContentWatchedTrue();
        this.ddb.updateUserContentWatched();
      }
    }
    // The API will call this function when the video player is ready
    onPlayerReady(event) {
      event.target.playVideo();
    }

    ngOnDestroy() {
      this.loadingScreenService.stopLoading();
      this.player = null;
      (window as any).YT = null;
    }

  // tslint:disable-next-line:use-lifecycle-interface


}
