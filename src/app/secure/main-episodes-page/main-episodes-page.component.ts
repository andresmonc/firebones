import { Component, OnInit, OnDestroy } from '@angular/core';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { DynamoDBService } from '../../service/ddb.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';


@Component({
  selector: 'app-main-episodes-page',
  templateUrl: './main-episodes-page.component.html',
  styleUrls: ['./main-episodes-page.component.css']
})
export class MainEpisodesPageComponent implements OnInit, OnDestroy {

  objectKeys = Object.keys;
  public episodesObj = this.episodeDetailsService.getEpisodes();
  public contentCount = this.ddb.getLocalStorageContentCount();
  public currentEpisode = this.getEpisodes();
  public contentWatched = this.ddb.getLocalStorageContentWatched();

  constructor(
    public episodeDetailsService: EpisodeDetailsService,
    public ddb: DynamoDBService,
    private loadingScreenService: LoadingScreenService
  ) {}

  ngOnInit() {
    // this.loadingScreenService.startLoading();

    if (this.contentWatched === 'TRUE') {
      this.ddb.getUserContent().then((data => {
        console.log('this is the resolved contentCount!!!', data);
        console.log('getUserObject function execution done!');
        this.contentCount = data;
        this.currentEpisode = this.getEpisodes();
        // this.loadingScreenService.stopLoading();
      }));
    }

    console.log('INIT CONTENT COUNT', this.contentCount);
  }

  ngOnDestroy() {
    this.contentCount = null;
    console.log('weve destroyed content count');
  }


  getEpisodes() {
    return this.episodeDetailsService.getEpisodeIdFromContentCount(this.contentCount);
  }



}
