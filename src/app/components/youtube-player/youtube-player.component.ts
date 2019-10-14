import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { YoutubeService } from '../../service/youtube.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  player;
  subscription: Subscription;

  constructor(
    private loadingScreenService: LoadingScreenService,
    private youtubeService: YoutubeService,
    ) {
      this.subscription = this.youtubeService.getVideoId().subscribe(epvideoId => {
        if (epvideoId) {
          console.log('Is this the youtube videoId?', epvideoId);
          this.player.loadVideoById(epvideoId);
        }
      });
    }

  ngOnInit() {
      this.loadingScreenService.startLoading();
      (window as any).onYouTubeIframeAPIReady = () => {
      console.log('Youtube Initalized');
      this.player = new (window as any).YT.Player('player', {
        height: '100%',
        width: '100%',
        events: {
          onReady: () => {
          console.log('onReady Event Ready Youtube API');
          this.loadingScreenService.stopLoading();
          },
          onStateChange: (event) => { this.onPlayerStateChange(event); }
        },
        playerVars: {autoplay: 1, controls: 1, modestbranding: 1, rel: 0, showInfo: 0}
      });
    };
  }

  ngAfterViewInit() {
    const doc = (window as any).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  onPlayerStateChange(event) {
    // We need to passs this event data to youtubeService
      this.youtubeService.setEventDataNumber(event.data);
    }

  ngOnDestroy() {
    console.log('Youtube component destroyed');
    this.player = null;
    (window as any).YT = null;
  }
}
