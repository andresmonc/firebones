import { Component, OnInit } from '@angular/core';
import { EpisodeDetailsService } from "../../service/episode-details.service"
@Component({
  selector: 'app-main-episodes-page',
  templateUrl: './main-episodes-page.component.html',
  styleUrls: ['./main-episodes-page.component.css']
})
export class MainEpisodesPageComponent implements OnInit {
  objectKeys = Object.keys
  public episodesObj = this.episodeDetailsService.getEpisodes()

  constructor(public episodeDetailsService: EpisodeDetailsService) { }

  ngOnInit() {
    // console.log(this.episodesObj)
  }

}
