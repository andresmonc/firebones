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
  public foo;
  public contentCount;

  constructor(public episodeDetailsService: EpisodeDetailsService) { }

  ngOnInit() {
    this.foo = localStorage.getItem("name")
    this.contentCount = localStorage.getItem("contentCount");
    console.log(this.foo)
    console.log(this.contentCount);
  }


}
