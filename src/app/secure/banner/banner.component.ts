import { Component, OnInit, HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '../../service/window.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public bringTextCloser = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.styleNav();
  }

  styleNav() {
    if (this.document.body.clientWidth < 399) {
      this.bringTextCloser = true;
      this.document.getElementById('navbar').style.padding = '0px 10px';
      this.document.getElementById('navbar').style.height = '115px';
      this.document.getElementById('navbar').style.top = '-2%';
      this.document.getElementById('navbar').style.backgroundColor = 'black';
      this.document.getElementById('navbar').style.color = '#f9dfbe';
      this.document.getElementById('logo').style.height = 'auto';
      this.document.getElementById('logo').style.transform = 'scale(' + (1 - 110 / 250) + ')';
      this.document.getElementById('logo').style.webkitTransition = 'all 2s ease';
      this.document.getElementById('logo').style.transition = 'all 2s ease';
      this.document.getElementsByClassName('');
    } else if (this.document.body.clientWidth < 900 && this.document.body.clientWidth > 400) {
      this.bringTextCloser = true;
      this.document.getElementById('navbar').style.padding = '0px 30px';
      this.document.getElementById('navbar').style.height = '135px';
      this.document.getElementById('navbar').style.top = '-3%';
      this.document.getElementById('navbar').style.backgroundColor = 'black';
      this.document.getElementById('navbar').style.color = '#f9dfbe';
      this.document.getElementById('logo').style.height = 'auto';
      this.document.getElementById('logo').style.transform = 'scale(' + (1 - 140 / 250) + ')';
      this.document.getElementById('logo').style.webkitTransition = 'all 2s ease';
      this.document.getElementById('logo').style.transition = 'all 2s ease';
    } else {
      this.bringTextCloser = true;
      this.document.getElementById('navbar').style.padding = '0px 10px';
      this.document.getElementById('navbar').style.height = '195px';
      this.document.getElementById('navbar').style.top = '-6%';
      this.document.getElementById('navbar').style.backgroundColor = 'black';
      this.document.getElementById('navbar').style.color = '#f9dfbe';
      this.document.getElementById('logo').style.height = 'auto';
      this.document.getElementById('logo').style.transform = 'scale(' + (1 - 110 / 250) + ')';
      this.document.getElementById('logo').style.webkitTransition = 'all 2s ease';
      this.document.getElementById('logo').style.transition = 'all 2s ease';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.styleNav();
  }


}
