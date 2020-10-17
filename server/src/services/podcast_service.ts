import * as ItunesService from '../services/itunes_service';
import * as FeedService from '../services/feed_service';

interface PodcastProvider {
  getByID(podcastID: string): Promise<PodcastData>
}

export interface PodcastData {
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

export interface ResponsePodcastData extends PodcastData {
  additionalInfo?: {
    startDate?: string;
    image?: string;
    summary?: string;
  },
}

export async function getByID(podcastID: string, provider: PodcastProvider = ItunesService): Promise<ResponsePodcastData> {
  const podcastData = await provider.getByID(podcastID);

  if (podcastData?.feedURL) {
    const rssData = await FeedService.getFeedByURL(podcastData.feedURL);

    if (rssData) {
      return {
        ...podcastData,
        additionalInfo: {
          startDate: rssData.startDate,
          image: rssData.image,
          summary: rssData.summary,
        }
      }
    }
  }

  return podcastData;
}
