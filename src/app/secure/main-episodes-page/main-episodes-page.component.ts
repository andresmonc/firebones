import { Component, OnInit, OnDestroy } from '@angular/core';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { DynamoDBService } from '../../service/ddb.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';


@Component({
  selector: 'app-main-episodes-page',
  templateUrl: './main-episodes-page.component.html',
  styleUrls: ['./main-episodes-page.component.scss']
})
export class MainEpisodesPageComponent implements OnInit, OnDestroy {

  objectKeys = Object.keys;
  public episodesObj = this.episodeDetailsService.getEpisodes();
  public contentCount = this.ddb.getLocalStorageContentCount();
  public currentEpisode = this.getEpisodes();
  public contentWatched = this.ddb.getLocalStorageContentWatched();
  public timeStamp = new Date(this.ddb.getLocalStorageTimeStamp());
  public contentCountForBadge;
  public prevContentCountForBadge;

  constructor(
    public episodeDetailsService: EpisodeDetailsService,
    public ddb: DynamoDBService,
    private loadingScreenService: LoadingScreenService
  ) {}

  ngOnInit() {
    this.contentCountForBadge = this.ddb.getLocalStorageContentCount();
    this.prevContentCountForBadge = this.ddb.getLocalStoragePrevContentCount();
    const currentTime = new Date();
    if (this.contentWatched === 'TRUE' && (currentTime.getTime() > this.timeStamp.getTime())) {
    // if (this.contentWatched === 'TRUE') {
      this.loadingScreenService.startLoading();
      this.ddb.getUserContent().then((data => {
        console.log('this is the resolved contentCount!!!', data);
        console.log('getUserObject function execution done!');
        this.contentCount = data;
        this.currentEpisode = this.getEpisodes();
        this.contentCountForBadge = this.ddb.getLocalStorageContentCount();
        this.prevContentCountForBadge = this.ddb.getLocalStoragePrevContentCount();
        this.loadingScreenService.stopLoading();
      }));
    }
    console.log('INIT CONTENT COUNT', this.contentCount);
  }

  ngOnDestroy() {
    this.contentCount = null;
    console.log('weve destroyed content count');
  }

  isCurrentPacket(key) {
    // extract episode details service content keys for main ep icons
    const jsonObj = this.episodesObj[key].contentArray;
    const episodeKeys = Object.keys(jsonObj);

    // check if keys from episode details service are in line with local storage counts
    if (
     episodeKeys.includes(this.contentCountForBadge)
     && episodeKeys.includes(this.prevContentCountForBadge)
     && this.contentWatched === 'FALSE'
     ) {
      return true;
    } else {
      return false;
    }
  }


  getEpisodes() {
    return this.episodeDetailsService.getEpisodeIdFromContentCount(this.contentCount);
  }



}
