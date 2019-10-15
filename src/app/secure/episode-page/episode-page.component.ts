import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamoDBService } from '../../service/ddb.service';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { YoutubeService } from '../../service/youtube.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'awscognito-angular2-app',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.css']
})
export class EpisodePageComponent implements OnInit, OnDestroy, AfterViewInit {
  objectKeys = Object.keys;
  public id = this.route.snapshot.paramMap.get('id');
  public episodeTitle: string = this.episodeDetailsService.getEpisodeTitle(this.id);
  public episodeDesc: string = this.episodeDetailsService.getEpisodeDesc(this.id);
  public episodeContent: JSON = this.episodeDetailsService.getEpisodeContentArray(this.id);
  public contentCount = this.ddb.getLocalStorageContentCount();
  public contentWatched = this.ddb.getLocalStorageContentWatched();
  public clickInContentKey;
  public episodeVideoId = '';
  public timelineEpisodeCount;
  public youtubeEventDataNumber;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public ddb: DynamoDBService,
    public episodeDetailsService: EpisodeDetailsService,
    private loadingScreenService: LoadingScreenService,
    private youtubeService: YoutubeService,
  ) {
    console.log('in Episode Page');
    this.loadingScreenService.startLoading();

    this.subscription = this.youtubeService.getVideoFinished().subscribe(videoFinished => {
      if (videoFinished) {
        console.log('Is this the youtube evendata number?', videoFinished);
        console.log(this.contentWatched);
        console.log(this.clickInContentKey);
        console.log(this.contentCount);
        if (videoFinished === true && this.contentWatched === 'FALSE' && this.clickInContentKey === this.contentCount) {
          console.log('UPDATING CONTENT WATCH TO TRUE ONCE ONLY');
          // if content count is less than 2
          this.contentWatched = 'TRUE';
          this.ddb.setLocalStorageContentWatchedTrue();
          this.ddb.updateUserContentWatched();
        }
      }
    });

  }

  isEven(num) { return !(num % 2); }

  ngOnInit() {
    this.loadingScreenService.startLoading();
    this.timelineEpisodeCount = this.getTimelineEpisodeCount();

    if (this.contentWatched === 'TRUE') {
      this.ddb.getUserContent().then(data => {
        console.log('this is the resolved contentCount!!!', data);
        console.log('getUserObject function execution done!');
        this.contentCount = data;
        this.timelineEpisodeCount = this.getTimelineEpisodeCount();
        this.loadingScreenService.stopLoading();
      });
    }
    this.loadingScreenService.stopLoading();
  }

  ngAfterViewInit() { }

  setVideoId(epvideoId, contentKey) {
    // this.player.loadVideoById(epvideoId);
    this.youtubeService.setVideoId(epvideoId);
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
    console.log('last key count', lastKeyCount);
    return lastKeyCount;
  }

  ngOnDestroy() {
    this.loadingScreenService.stopLoading();
  }
}
