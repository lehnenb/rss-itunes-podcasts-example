import  ItunesSearch, { ItunesEntityPodcast, ItunesLookupType, ItunesProperties } from "node-itunes-search";
import { getOrSet } from "./redis_service";

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
    
    throw new Error(`Invalid URL`);
  }
}

interface ItunesData {
  id?: number;
  name: string;
  episodeCount?: number;
  genres: string[];
  feedURL?: string;
  viewURL?: string;
  lastEpisodeDate?: string;
  primaryGenre?: string;
  author: {
    url?: string;
    name?: string;
    id?: number;
  };
  artwork: {
    small?: string;
    medium?: string;
    big?: string;
  };
}

interface RawData {
  genres: string[];
  artworkUrl600: string;
  feedUrl: string; 
  trackCount: number;
  releaseDate: string;
}

function mapItunesPropertiesToPodcastData(result: ItunesProperties): ItunesData {
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

export async function getByID(podcastID: string): Promise<ItunesData | null> {
  const data = await getOrSet(podcastID, async () => {
    const data = await ItunesSearch
      .lookup({
        keys: [podcastID],
        keyType: ItunesLookupType.ID,
        entity: ItunesEntityPodcast.Podcast,
        limit: 1,
      });

    if (data.resultCount == 0) {
      return null;
    }

    return JSON.stringify(
      mapItunesPropertiesToPodcastData(data.results[0]),
    );
  }, 3600);

  return data && JSON.parse(data);
}
