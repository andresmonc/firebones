import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamoDBService } from '../../service/ddb.service';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { YoutubeService } from '../../service/youtube.service';
import { Subscription } from 'rxjs';
import { PlatformLocation, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../global-message-modal/global-message-modal.component';


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
  public currentAudioKey;
  public episodeVideoId = '';
  public timelineEpisodeCount;
  public youtubeEventDataNumber;
  subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public router: Router,
    private dialog: MatDialog,
    private location: PlatformLocation,
    private route: ActivatedRoute,
    public ddb: DynamoDBService,
    public episodeDetailsService: EpisodeDetailsService,
    private loadingScreenService: LoadingScreenService,
    private youtubeService: YoutubeService,
  ) {
    console.log('in Episode Page');
    this.route.params.subscribe( params => console.log('This is the params entered to get in this component', ) );

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
       this.contentWatchAPICallIfLast();
      }
    });
  }


  isEven(num) { return !(num % 2); }

  ngOnInit() {
    console.log('were on regular epsidoes PAGE');
    this.timelineEpisodeCount = this.getTimelineEpisodeCount();
    console.log('This is the timeEpisodeCount were working with', this.timelineEpisodeCount);
    const currentTime = new Date();

    // Checks to see if it is time to check again for a db call to get new packet
    if ((this.contentWatched === 'TRUE' && (currentTime.getTime() > this.timeStamp.getTime()))) {
    // if (this.contentWatched === 'TRUE' ) {
      this.loadingScreenService.startLoading();
      this.ddb.getUserContent().then(data => {
        console.log('this is the resolved contentCount!!!', data);
        console.log('getUserObject function execution done!');
        this.contentCount = data;
        this.timelineEpisodeCount = this.getTimelineEpisodeCount();
        const currentEpisode = this.episodeDetailsService.getEpisodeIdFromContentCount(this.contentCount);
        this.router.navigate(['/securehome']);
        this.loadingScreenService.stopLoading();
        this.openDialog('', 'You have new content!', 'Close');
      });
    }
  }

  ngAfterViewInit() { }

  isNewContent(contentKey) {
    return !this.ddb.getLocalStorageContentArrayEpisode(contentKey);
  }

  setVideoId(epvideoId, contentKey) {
    this.clickInContentKey = contentKey;
    this.youtubeService.setVideoId(epvideoId);
  }

  setImageUrl(imageUrl, contentKey) {
    this.clickInContentKey = contentKey;
    (document.querySelector('.img-tag') as HTMLImageElement).src = imageUrl;
    this.contentWatchAPICallIfLast();
  }

  setAudioUrl(audioUrl, contentKey) {
    this.clickInContentKey = contentKey;
    (document.querySelector('.audio-tag') as HTMLImageElement).src = audioUrl;
  }

  audioEnded() {
    this.contentWatchAPICallIfLast();
  }

  contentWatchAPICallIfLast() {
    console.log('this is the clicked in content key', this.clickInContentKey);
    // Check if content is Packet
    if (this.ddb.contentIsInPacket(this.clickInContentKey)) {
      console.log('this content is in the packet');
      // Check if current packet is complete
      if (this.contentWatched === 'FALSE') {
        console.log('this content watch flag is false');
        // Checking if episode is unwatched
        if (this.isNewContent(this.clickInContentKey)) {
          console.log('this new content');
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
            console.log('this is not the last content in the packet!!!!');
            // here we just set the local storage content array value to true
            this.ddb.setLocalStorageContentEpisode(this.clickInContentKey);
          }
        }
      }
    }
  }


  getTimelineEpisodeCount() {
    // let timelineCount = 0;
    // const lastKeyCount = Object.keys(this.episodeContent).length;

    // console.log("lastKeyCount", lastKeyCount);
    // console.log("this.contentCount", this.contentCount);

    // // tslint:disable-next-line:forin
    // for (const key in this.episodeContent) {
    //   timelineCount++;
    //   if (key === this.contentCount) {
    //     return timelineCount;
    //   }
    // }
    // return lastKeyCount;
    if (['24', '34'].includes(this.contentCount)) {
      return 4;
    } else {
      return 3;
    }
  }

  openDialog(headerText: string, text: string, buttonText: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        modalHeader: headerText,
        modalText: text,
        modalButtonText: buttonText
    };

    this.dialog.open(GlobalMessageModalComponent, dialogConfig);
}

  ngOnDestroy() {
    this.loadingScreenService.stopLoading();
  }
}
