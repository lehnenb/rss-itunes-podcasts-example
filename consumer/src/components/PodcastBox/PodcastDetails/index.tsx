import React, { memo } from 'react';
import { ResponsePodcastData } from 'api_types';
import { format, parseISO } from 'date-fns';

interface Props {
  podcast: ResponsePodcastData;
}

function formatDate(isoDate: string): string {
  return format(parseISO(isoDate), 'dd/MM/yyyy');
}

const PodcastDetails: React.FunctionComponent<Props> = ({ podcast }: Props) => (
  <div className="podcast-box__details">
    {
      (podcast.additionalInfo?.startDate)
      && (
        <span className="podcast-box__details__item">
          <span>First release:</span>
          <span>{formatDate(podcast.additionalInfo.startDate)}</span>
        </span>
      )
    }
    {
      (podcast.lastEpisodeDate)
      && (
        <div className="podcast-box__details__item">
          <span>Last release:</span>
          <span>{formatDate(podcast.lastEpisodeDate)}</span>
        </div>
      )
    }
    {
      (podcast.episodeCount)
        && (
          <div className="podcast-box__details__episode-count">
            <span>
              {podcast.episodeCount}
            </span>
            <span>
              episodes
            </span>
          </div>
        )
    }
    {
      (podcast.additionalInfo?.summary)
        && (
        <div className="podcast-box__summary">
          { (podcast.additionalInfo?.summary) }
        </div>
        )
    }
  </div>
);

export default memo(PodcastDetails);
