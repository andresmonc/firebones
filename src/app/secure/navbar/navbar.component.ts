import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentRoute: String = this.router.url;
  public showTimelineButton: Boolean = false;
  public showPlaceholderButton: Boolean = true;
  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }
    });

  }



  ngOnInit() {
    console.log(this.currentRoute);
    console.log(this.router.events.subscribe((event: Event) => { }));
  }

}
