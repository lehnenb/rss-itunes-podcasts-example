import ItunesSearch from 'node-itunes-search';
import { mocked } from 'ts-jest/utils';
import { promisify } from 'util';

import * as ItunesService from '../../src/services/itunes_service';
import * as RedisService from '../../src/services/redis_service';

jest.mock('node-itunes-search');

const mockedSearch =  mocked(ItunesSearch.lookup);

afterEach(() => promisify(RedisService.client.flushall).call(RedisService.client));
afterAll(() => promisify(RedisService.client.quit).call(RedisService.client));

describe('Itunes Service', () => {
  describe('Success', () => {
    const result = {
      collectionName: "CoRecursive with Adam Gordon Bell",
      raw: {},
      artistName: "Adam Gordon Bell",
      primaryGenreName: "Technology",
      artworkUrl100:  "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/100x100bb.jpg",
      collectionViewUrl: "https://podcasts.apple.com/us/podcast/corecursive-with-adam-gordon-bell/id1330329512?uo=4"
    };

    describe('without optional data', () => {
      it('should return the correct data from itunes', () => {
        mockedSearch.mockResolvedValue({
          results: [result],
          resultCount: 1,
        });

        const promise = ItunesService.getByID('552333');

        return expect(promise).resolves.toEqual({
          name: "CoRecursive with Adam Gordon Bell",
          author: {
            name: "Adam Gordon Bell"
          },
          artwork: {
            medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/100x100bb.jpg",
          },
          primaryGenre: "Technology",
          viewURL: "https://podcasts.apple.com/us/podcast/corecursive-with-adam-gordon-bell/id1330329512?uo=4",
          genres: [],
        })
      });
    });

    describe('with optionalData', () => {
      it('should return the correct data from itunes', () => {
        mockedSearch.mockResolvedValue({
          results: [{
            ...result,
            artistViewUrl: "http://artisturl.com",
            artistId: 5553333,
            collectionId: 393939,
            primaryGenreName: "Technology",
            artworkUrl100: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/100x100bb.jpg",
            artworkUrl60: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/60x60bb.jpg",
            raw: {
              artworkUrl600: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/600x600bb.jpg",
              genres: ["Technology", "Education"],
              feedUrl: "https://corecursive.libsyn.com/feed",
            },
            collectionViewUrl: "https://podcasts.apple.com/us/podcast/corecursive-with-adam-gordon-bell/id1330329512?uo=4",
          }],
          resultCount: 1,
        });

        const promise = ItunesService.getByID('124444');

        return expect(promise).resolves.toEqual({
          id: 393939,
          name: "CoRecursive with Adam Gordon Bell",
          feedURL: "https://corecursive.libsyn.com/feed",
          genres: ["Technology", "Education"],
          author: {
            id: 5553333,
            url: 'http://artisturl.com',
            name: "Adam Gordon Bell",
          },
          artwork: {
            small: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/60x60bb.jpg",
            medium: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/100x100bb.jpg",
            big: "https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a4/95/28/a4952813-8035-a67e-8522-3f08a4aa97d3/mza_3857535690737981623.jpg/600x600bb.jpg"
          },
          primaryGenre: "Technology",
          viewURL: "https://podcasts.apple.com/us/podcast/corecursive-with-adam-gordon-bell/id1330329512?uo=4"
        })
      });
    });
  });

  describe('Failure', () => {
    describe('not found', () => {
      it('should return null when record is not found', () => {
        mockedSearch.mockResolvedValue({
          results: [],
          resultCount: 0,
        });

        const promise = ItunesService.getByID('11222333');
        return expect(promise).resolves.toStrictEqual(null);
      })
    })
  });
});