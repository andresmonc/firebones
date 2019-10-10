import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  loading = true;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
