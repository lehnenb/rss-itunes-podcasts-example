import Parser from 'rss-parser';

import { promisify } from 'util';
import { getByID } from '../../src/services/podcast_service';
import { client } from '../../src/services/redis_service';

function itunesData() {
  return {
    id: 1473854035,
    name: 'Apple Events',
    episodeCount: 4,
    lastEpisodeDate: '2020-10-13T19:11:00Z',
    primaryGenre: 'Technology',
    genres: [
      'Technology',
      'Podcasts',
      'News',
      'Tech News'
    ],
    viewURL: 'https://podcasts.apple.com/us/podcast/apple-events/id1473854035?uo=4',
    feedURL: 'https://rss.art19.com/apple-events',
    author: {
      id: 706424103,
      name: 'Apple Inc.',
      url: 'https://podcasts.apple.com/us/artist/apple-inc/706424103?uo=4'
    },
    artwork: {
      small: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/60x60bb.jpg',
      medium: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2a-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/100x100bb.jpg',
      big: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg'
    },
  };
}

function feedData() {
  return {
    image: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg',
    startDate: '2020-06-21T17:00:00.000Z',
    summary: '<p>The Apple Events podcast is home to the latest keynote addresses. Listen to announcements of new products and services and browse the archive of past events to relive revolutionary moments in the history of personal technology.</p>'
  };
}

jest.mock('../../src/services/itunes_service', () => ({
  getByID: jest.fn().mockResolvedValue(itunesData()) 
}));

jest.mock('../../src/services/feed_service', () => ({ 
  getFeedByURL: jest.fn().mockResolvedValue(feedData())
}));

afterEach(() => promisify(client.flushall).call(client));
afterAll(() => promisify(client.quit).call(client));

describe('Podcast Service', () => {
  describe('Success', () => {
    it('should return the correct RSS feed', () => {
      const promise = getByID('12321')

      return expect(promise)
        .resolves
        .toEqual({
          ...itunesData(),
          additionalInfo: { ...feedData() }
        });
    });

    describe('Custom provider', () => {
      it('should call getByID on custom provider', async () => {
        const mockedProvider = {
          getByID: jest.fn(),
        };

        await getByID('12313', mockedProvider);

        return expect(mockedProvider.getByID).toHaveBeenCalledWith('12313');
      });
    })
  });
});
