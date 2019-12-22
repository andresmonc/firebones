import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamoDBService } from '../../service/ddb.service';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { YoutubeService } from '../../service/youtube.service';
import { Subscription } from 'rxjs';
import { PlatformLocation, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';



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
  public unformattedTimeStamp = this.ddb.getLocalStorageTimeStamp();
  public timeStamp = new Date(this.unformattedTimeStamp);
  public clickInContentKey;
  public episodeVideoId = '';
  public timelineEpisodeCount;
  public youtubeEventDataNumber;
  subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    private location: PlatformLocation,
    private route: ActivatedRoute,
    public ddb: DynamoDBService,
    public episodeDetailsService: EpisodeDetailsService,
    private loadingScreenService: LoadingScreenService,
    private youtubeService: YoutubeService,
  ) {
    console.log('in Episode Page');
    this.loadingScreenService.startLoading();

    /*
    *  This is where we decide what we want to do if the video the user played has ended,
    *  First we check if the user's content is in the current packet AND the globalcontent watch flag is true,
    *  if not then do nothing.
    *  If so, and their BOOLEAN value from ContentArray is TRUE then do nothing,
    *  if its FALSE, then, we check if it is the last epsisode in the packet,
    *  if not, then we change the local storage value in ConentArray to TRUE,
    *  if it is the last episode in the packet, then we set the ContentArray value to TRUE,
    *  then we also do our API call to DynamoDB to set the contentWatched flag to TRUE so the
    *  daily Lambda can run and increment prevCount and contentCount
    */

    this.subscription = this.youtubeService.getVideoFinished().subscribe(videoFinished => {
      if (videoFinished) {
        console.log('Is this the youtube evendata number?', videoFinished);
        // Check if content is Packet
        if (this.ddb.contentIsInPacket(this.clickInContentKey)) {
          // Check if current packet is complete
          if (this.contentWatched === 'FALSE') {
            // Checking if episode is unwatched
            if (this.isNewContent(this.clickInContentKey)) {
                // Here we check if this episode is the last episode in the packet
              if (this.ddb.lastContentInPacket()) {
                // Here we do our API call to dyanmo DB
                // set our local values for contentWatch and contentArray
                // and assign our timestamp
                console.log('this is the last content In packet!!!!');
                this.ddb.setLocalStorageContentWatchedTrue();
                this.ddb.updateUserContentWatched();
                this.ddb.setLocalStorageTimeStamp();
                this.ddb.setLocalStorageContentEpisode(this.clickInContentKey);
              } else {
                // here we just set the local storage content array value to true
                this.ddb.setLocalStorageContentEpisode(this.clickInContentKey);
              }
            }
          }
        }
      }
    });

    // this.ddb.setLocalStorageContentWatchedTrue();
    // this.ddb.updateUserContentWatched();
    // this.ddb.setLocalStorageTimeStamp();

  }

  isEven(num) { return !(num % 2); }

  ngOnInit() {
    this.loadingScreenService.startLoading();
    this.timelineEpisodeCount = this.getTimelineEpisodeCount();
    const currentTime = new Date();

    if ((this.contentWatched === 'TRUE' && (currentTime.getTime() > this.timeStamp.getTime()))) {
      this.ddb.getUserContent().then(data => {
        console.log('this is the resolved contentCount!!!', data);
        console.log('getUserObject function execution done!');
        this.contentCount = data;
        this.timelineEpisodeCount = this.getTimelineEpisodeCount();
        this.loadingScreenService.stopLoading();
      });
    } else {
      this.loadingScreenService.stopLoading();
    }
  }

  ngAfterViewInit() { }

  isNewContent(contentKey) {
    return !this.ddb.getLocalStorageContentArrayEpisode(contentKey);
  }

  setVideoId(epvideoId, contentKey) {
    // this.player.loadVideoById(epvideoId);
    this.youtubeService.setVideoId(epvideoId);
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
