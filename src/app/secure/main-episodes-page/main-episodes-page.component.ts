import { Component, OnInit } from '@angular/core';
import { EpisodeDetailsService } from '../../service/episode-details.service';
import { DynamoDBService } from '../../service/ddb.service';

@Component({
  selector: 'app-main-episodes-page',
  templateUrl: './main-episodes-page.component.html',
  styleUrls: ['./main-episodes-page.component.css']
})
export class MainEpisodesPageComponent implements OnInit {
  objectKeys = Object.keys;
  public episodesObj = this.episodeDetailsService.getEpisodes();
  public contentCount = this.ddb.getLocalStorageContentCount();


  constructor(
    public episodeDetailsService: EpisodeDetailsService,
    public ddb: DynamoDBService,
    ) { 
      this.ddb.updateUserContentWatched();
    }

  ngOnInit() {

  }




}
