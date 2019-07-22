import { Component, OnInit, HostListener } from '@angular/core';
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { WINDOW } from "../../service/window.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public bringTextCloser: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) { }

  ngOnInit() {
    this.styleNav()
  }



  styleNav() {
    if (this.document.body.clientWidth < 399) {
      this.bringTextCloser = true;
      this.document.getElementById("navbar").style.padding = "0px 10px";
      this.document.getElementById("navbar").style.height = "130px";
      this.document.getElementById("navbar").style.top = "-2%";
      this.document.getElementById("navbar").style.backgroundColor = "black";
      this.document.getElementById("navbar").style.color = "#f9dfbe";
      this.document.getElementById("logo").style.height = "auto";
      this.document.getElementById("logo").style.transform = 'scale(' + (1 - 110 / 250) + ')'
      this.document.getElementById("logo").style.webkitTransition = "all 2s ease";
      this.document.getElementById("logo").style.transition = "all 2s ease";
      this.document.getElementsByClassName("")
    }

    else if (this.document.body.clientWidth < 900 && this.document.body.clientWidth > 400) {
      this.bringTextCloser = true;
      this.document.getElementById("navbar").style.padding = "0px 10px";
      this.document.getElementById("navbar").style.height = "165px";
      this.document.getElementById("navbar").style.top = "-2%";
      this.document.getElementById("navbar").style.backgroundColor = "black";
      this.document.getElementById("navbar").style.color = "#f9dfbe";
      this.document.getElementById("logo").style.height = "auto";
      this.document.getElementById("logo").style.transform = 'scale(' + (1 - 110 / 250) + ')'
      this.document.getElementById("logo").style.webkitTransition = "all 2s ease";
      this.document.getElementById("logo").style.transition = "all 2s ease";
    }

    else {
      this.bringTextCloser = true;
      this.document.getElementById("navbar").style.padding = "0px 10px";
      this.document.getElementById("navbar").style.height = "265px";
      this.document.getElementById("navbar").style.top = "-6%";
      this.document.getElementById("navbar").style.backgroundColor = "black";
      this.document.getElementById("navbar").style.color = "#f9dfbe";
      this.document.getElementById("logo").style.height = "auto";
      this.document.getElementById("logo").style.transform = 'scale(' + (1 - 110 / 250) + ')'
      this.document.getElementById("logo").style.webkitTransition = "all 2s ease";
      this.document.getElementById("logo").style.transition = "all 2s ease";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.styleNav();
  }


}
