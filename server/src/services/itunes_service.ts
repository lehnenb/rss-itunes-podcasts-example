import ItunesSearch, { ItunesEntityPodcast, ItunesLookupType, ItunesProperties } from 'node-itunes-search';
import { InvalidInputError } from '../errors/invalid_input_error';
import { ResourceNotFoundError } from '../errors/resource_not_found_error';
import { PodcastData } from './podcast_service';
import { getOrSet } from './redis_service';

export function extractID(url: string): string {
  try {
    const parsedURL = new URL(url);
    const matchData = parsedURL.pathname.match(/\/id([0-9]*)$/)

    if (matchData) {
      return matchData[2];
    } else {
      throw new Error('ID segment not found');
    }

  } catch(e: unknown) {
    console.error(e); 
    
    throw new Error('Invalid URL');
  }
}

interface RawData {
  genres: string[];
  artworkUrl600: string;
  feedUrl: string; 
  trackCount: number;
  releaseDate: string;
}

function mapItunesPropertiesToPodcastData(result: ItunesProperties): PodcastData {
  const raw: Partial<RawData> = { ...result.raw };

  return {
    id: result.collectionId,
    name: result.collectionName,
    episodeCount: raw.trackCount,
    lastEpisodeDate: raw.releaseDate,
    primaryGenre: result.primaryGenreName,
    genres: raw.genres || [],
    viewURL: result.collectionViewUrl,
    feedURL: raw.feedUrl,
    author: {
      id: result.artistId,
      name: result.artistName,
      url: result.artistViewUrl,
    },
    artwork: {
      small: result.artworkUrl60,
      medium: result.artworkUrl100,
      big: raw.artworkUrl600,
    },
  };
}

export async function getByID(podcastID: string): Promise<PodcastData> {
  if (!podcastID.match(/^[0-9]+$/)) {
    throw new InvalidInputError('Invalid Podcast ID');
  }

  const data = await getOrSet(podcastID, async () => {
    const searchData = await ItunesSearch
      .lookup({
        keys: [podcastID],
        keyType: ItunesLookupType.ID,
        entity: ItunesEntityPodcast.Podcast,
        limit: 1,
      });

    if (searchData.resultCount == 0) {
      throw new ResourceNotFoundError('Podcast not found');
    }

    return JSON.stringify(
      mapItunesPropertiesToPodcastData(searchData.results[0]),
    );
  }, 3600);

  return data && JSON.parse(data);
}
