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
          contentType: 'Episode 1: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        2: {
          contentType: 'Episode 2: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        3: {
          contentType: 'Episode 3: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      }
    },
    2: {
      episodeTitle: 'Purple Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        4: {
          contentType: 'Episode 4: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        5: {
          contentType: 'Episode 5: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        6: {
          contentType: 'Episode 6: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    },
    3: {
      episodeTitle: 'Purple Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        7: {
          contentType: 'Episode 7: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        8: {
          contentType: 'Episode 8: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        9: {
          contentType: 'Episode 9: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    },
    4: {
      episodeTitle: 'Purple Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 00 -how to go show.svg',
      contentArray: {
        10: {
          contentType: 'Episode 10: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        11: {
          contentType: 'Episode 11: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        12: {
          contentType: 'Episode 12: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    }
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
