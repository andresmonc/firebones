import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { DynamoDBService } from '../../service/ddb.service';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { Router} from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalMessageModalComponent } from '../../global-message-modal/global-message-modal.component';

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
  public contentWatched;
  public timeStamp = new Date(this.ddb.getLocalStorageTimeStamp());
  public contentCountForBadge;
  public prevContentCountForBadge;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public episodeDetailsService: EpisodeDetailsService,
    public ddb: DynamoDBService,
    private loadingScreenService: LoadingScreenService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    console.log("were on main episodes page")
    this.contentCountForBadge = this.ddb.getLocalStorageContentCount();
    this.prevContentCountForBadge = this.ddb.getLocalStoragePrevContentCount();
    this.contentWatched = this.ddb.getLocalStorageContentWatched();
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
        this.contentWatched = 'FALSE';
        this.router.navigate(['/securehome']);
        this.loadingScreenService.stopLoading();
        this.openDialog('', 'You have new content!', 'Close');
      }));
    }
    console.log('INIT CONTENT COUNT', this.contentCount);
  }

  ngOnDestroy() {
    this.loadingScreenService.stopLoading();
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



}
