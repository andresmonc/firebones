import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-episodes-page',
  templateUrl: './main-episodes-page.component.html',
  styleUrls: ['./main-episodes-page.component.css']
})
export class MainEpisodesPageComponent implements OnInit {

  public test : String = "episode-page";
  public episodePayload: Array<Array<String>> = [["1", "I Love Lucy","episode-page"], ["2", "Jumping Jehosivits","episode-page"]];
  constructor() { }

  ngOnInit() {
  }

}
