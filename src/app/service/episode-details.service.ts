import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailsService {

  private episodesDetails: JSON = {
    1: {
      episodeTitle: 'Pilot',
      episodeDesc: 'loremipsum',
      contentArray: {
        1: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        2: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        3: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        4: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        5: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
      }
    },
    2: {
      episodeTitle: 'Purple Giraffe',
      episodeDesc: 'loremipsum',
      contentArray: {
        6: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        7: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        8: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        },
        9: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          mediaUrl: 'hellowrold.com',
        }
      },
    },
    3: { episodeTitle: 'Return of the Shirt', episodeDesc: 'loremipsum' },
    4: { episodeTitle: 'The Limo', episodeDesc: 'loremipsum' },
    5: { episodeTitle: 'The Wedding', episodeDesc: 'loremipsum' },
    6: { episodeTitle: 'Game Night', episodeDesc: 'loremipsum' },
    7: { episodeTitle: 'Milk', episodeDesc: 'loremipsum' },
    8: { episodeTitle: 'Come On', episodeDesc: 'loremipsum' }
  } as unknown as JSON;

  constructor() { }

  episodeLookup(id) {
    for (const episode in this.episodesDetails) {
      if (episode === id) {
        return this.episodesDetails[episode];
      }

    }
  }

  getEpisodes() {
    return this.episodesDetails;
  }

  getEpisodeTitle(id) {
    const obj = this.episodeLookup(id);
    for (const key in obj) {
      if (key === 'episodeTitle') {
        return obj[key];
      }
    }
  }

  getEpisodeDesc(id) {
    const obj = this.episodeLookup(id);
    for (const key in obj) {
      if (key === 'episodeDesc') {
        return obj[key];
      }
    }
  }

  getEpisodeContentArray(id) {
    const obj = this.episodeLookup(id);
    for (const key in obj) {
      if (key === 'contentArray') {
        return obj[key];
      }
    }
  }




}
