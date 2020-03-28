import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailsService {

  private episodesDetails: JSON = {
    1: {
      episodeTitle: 'Pilot',
      episodeDesc: 'How to go show',
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
          iconUrl: 'snack 02 -eyes undeniable.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        3: {
          contentType: 'Episode 3: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 03 -95 song.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      }
    },
    2: {
      episodeTitle: 'Blue Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 01 -introducing greg and bart.svg',
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
      episodeTitle: 'Red Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 02 -the beekeeper spaceman.svg',
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
      episodeTitle: 'Green Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 03 -welcome to planet swan.svg',
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
    },
    5: {
      episodeTitle: 'Green Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 04 - razorback in time.svg',
      contentArray: {
        13: {
          contentType: 'Episode 10: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        14: {
          contentType: 'Episode 11: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        15: {
          contentType: 'Episode 12: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    },
    6: {
      episodeTitle: 'Green Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 05 -jumon_s desire.svg',
      contentArray: {
        14: {
          contentType: 'Episode 10: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        15: {
          contentType: 'Episode 11: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        16: {
          contentType: 'Episode 12: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    },
    7: {
      episodeTitle: 'Green Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 06 -halloween honey.svg',
      contentArray: {
        15: {
          contentType: 'Episode 10: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        16: {
          contentType: 'Episode 11: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        17: {
          contentType: 'Episode 12: This text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          audioUrl: 'https://www.html5tutorial.info/media/vincent.mp3'
        }
      },
    },
    8: {
      episodeTitle: 'Green Giraffe',
      episodeDesc: 'loremipsum',
      image: 'ep 07 -a girl named nobody.svg',
      contentArray: {
        18: {
          contentType: 'Episode 10: Pilot',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          videoId: 'HaWjwKhLu2g',
        },
        19: {
          contentType: 'Episode 11: Some Text',
          contentDesc: 'helloWorld',
          mediaType: 'audio',
          iconUrl: 'snack 01 -sportscaster disaster.svg',
          imageUrl: 'https://www.gstatic.com/webp/gallery/4.sm.jpg'
        },
        20: {
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
