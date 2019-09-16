import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailsService {

  private episodesDetails: JSON = <JSON><unknown>{
    1: { "episodeTitle": "Pilot", "episodeDesc": "loremipsum" },
    2: { "episodeTitle": "Purple Giraffe", "episodeDesc": "loremipsum" },
    3: { "episodeTitle": "Return of the Shirt", "episodeDesc": "loremipsum" },
    4: { "episodeTitle": "The Limo", "episodeDesc": "loremipsum" },
    5: { "episodeTitle": "The Wedding", "episodeDesc": "loremipsum" },
    6: { "episodeTitle": "Game Night", "episodeDesc": "loremipsum" },
    7: { "episodeTitle": "Milk", "episodeDesc": "loremipsum" },
    8: { "episodeTitle": "Come On", "episodeDesc": "loremipsum" }
  }
  constructor() { }

  episodeLookup(id) {
    for (var episode in this.episodesDetails) {
      if (episode == id) {
        console.log(this.episodesDetails[episode]);
        return this.episodesDetails[episode]
      }

    }
  }



}
