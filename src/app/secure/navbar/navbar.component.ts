import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { EpisodeDetailsService } from '../../service/episode-details.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentRoute: string = this.router.url;
  public contentCount: string;
  public showTimelineButton: Boolean = true;
  public currentEpisode;

  constructor(private router: Router, private episodeDetailsService: EpisodeDetailsService) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('navstart');
      }

      if (event instanceof NavigationEnd) {
        console.log('navend');
        this.contentCount = localStorage.getItem('contentCount');
        this.currentEpisode = this.episodeDetailsService.getEpisodeIdFromContentCount(this.contentCount);
      }

    });

  }



  ngOnInit() {
    console.log(this.currentRoute);
    // console.log(this.router.events.subscribe((event: Event) => { }));
  }

}
