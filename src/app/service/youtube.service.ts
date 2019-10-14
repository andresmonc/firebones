import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private subject = new Subject<any>();
  private videoIdSubject = new Subject<any>();


  setVideoFinished(youtubeEventData) {
    this.subject.next(youtubeEventData);
  }

  clearEventDataNumber() {
    this.subject.next();
  }

  getVideoFinished(): Observable<any> {
    return this.subject.asObservable();
  }

  setVideoId(episodeVideoId) {
    this.videoIdSubject.next(episodeVideoId);
  }

  getVideoId(): Observable<any> {
    return this.videoIdSubject.asObservable();
  }



}
