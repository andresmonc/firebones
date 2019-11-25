import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailsService {

  private episodesDetails: JSON = {
    1: {
      episodeTitle: 'Pilot',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        1: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        2: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        3: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        4: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        5: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
      }
    },
    2: {
      episodeTitle: 'Purple Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        6: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
          mediaUrl: 'hellowrold.com',
        },
        7: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
          mediaUrl: 'hellowrold.com',
        },
        8: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
          mediaUrl: 'hellowrold.com',
        },
        9: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
          mediaUrl: 'hellowrold.com',
        }
      },
    },
    3: {
      episodeTitle: 'Return of the Shirt',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        10: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        11: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        12: {
          contentType: 'snack',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        13: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
        14: {
          contentType: 'episode',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'helloworld.com',
          videoId: 'HaWjwKhLu2g',
        },
      }
    },
    4: { episodeTitle: 'The Limo',
    episodeDesc: 'loremipsum',
    image: 'ep 00 -how to go show.svg'
    },
    5: { episodeTitle: 'The Wedding', episodeDesc: 'loremipsum',
    image: 'ep 00 -how to go show.svg',
    },
    6: { episodeTitle: 'Game Night', episodeDesc: 'loremipsum',
    image: 'ep 00 -how to go show.svg'},
    7: { episodeTitle: 'Milk', episodeDesc: 'loremipsum',
    image: 'ep 00 -how to go show.svg'},
    8: { episodeTitle: 'Come On', episodeDesc: 'loremipsum',
    image: 'ep 00 -how to go show.svg'}
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

  getEpisodeIdFromContentCount(contentCount) {
    const length = Object.keys(this.episodesDetails).length;
    let i = 1;
    while (i <= length) {
      const contentArray: JSON = this.getEpisodeContentArray(i.toString());
      for (const key in contentArray) {
        if (key === contentCount) {
          return i;
        }
      }
      i++;
    }
  }



}
