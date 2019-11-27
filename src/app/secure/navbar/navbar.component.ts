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
  public currentEpisode;
  public homeHilight;
  public fireHilight;
  public profileHilight;

  constructor(private router: Router, private episodeDetailsService: EpisodeDetailsService) {


    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('navstart');
      }

      if (event instanceof NavigationEnd) {
        if (this.router.url === '/securehome/myprofile') {
          this.profileHilight = true;
          this.homeHilight = false;
          this.fireHilight = false;
        }
        if (this.router.url === '/securehome') {
          this.profileHilight = false;
          this.homeHilight = true;
          this.fireHilight = false;
        }
        if (this.router.url.startsWith('/securehome/episode-page')) {
          this.profileHilight = false;
          this.homeHilight = false;
          this.fireHilight = true;
        }
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
