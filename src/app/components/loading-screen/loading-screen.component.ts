import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from '../../service/loading-screen/loading-screen.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  loading = false;
  loadingSubscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private loadingScreenService: LoadingScreenService,
    private changeDetector: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      console.log('WE KNOW THE VALUE for loading HAS CHANGED OKAY', value);
      console.log(this.router.url);
      if (value === true && this.router.url !== '/home') {
        this.document.body.classList.add('disableScrolling');
      } else if (value === true && this.router.url === '/home'){
        this.document.body.classList.add('disableScrollingLogin');
      } else {
        this.document.body.classList.remove('disableScrolling');
        this.document.body.classList.remove('disableScrollingLogin');
      }
      this.loading = value;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
