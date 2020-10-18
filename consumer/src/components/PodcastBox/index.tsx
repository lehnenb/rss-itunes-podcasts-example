import React, { memo, useState } from 'react';
import { ResponsePodcastData } from 'api_types';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Components
import PodcastDetails from './PodcastDetails';

import './PodcastBox.scss';

interface Props {
  podcast: ResponsePodcastData;
}

const Podcast: React.FunctionComponent<Props> = ({ podcast }: Props) => {
  const [moreDetails, setMoreDetails] = useState(false);

  const size = {
    xs: 100,
    sm: 150,
    md: 200,
    lg: 250,
    xl: 300,
    xxl: 300,
  };

  const img = podcast.artwork.big || podcast.artwork.medium || podcast.artwork.small;

  function toggleDetails() {
    setMoreDetails(!moreDetails);
  }

  return (
    <div className="podcast-box">
      <Row>
        <Col span={10}>
          <div className="podcast-box__title">{ podcast.name }</div>
          <div>
            { (podcast.author.name && <div className="podcast-box__subTitle">{ podcast.author.name }</div>) }
            {
              (img)
                ? <Avatar shape="square" size={size} src={img} />
                : <Avatar shape="square" size={size} icon={<UserOutlined />} />
            }
          </div>
          <div className="podcast-box__menu">
            { podcast.genres.map((genre) => (<span className="podcast-box__menu__genre" key={genre}>{genre}</span>))}
            {
              (!moreDetails)
                ? <span onClick={toggleDetails} role="button" tabIndex={0} className="podcast-box__menu__more-details">More</span>
                : <span onClick={toggleDetails} role="button" tabIndex={0} className="podcast-box__menu__more-details">Less</span>
            }
          </div>
        </Col>
        <Col span={14}>
          { (moreDetails) && (<PodcastDetails podcast={podcast} />) }
        </Col>
      </Row>
    </div>

  );
};

export default memo(Podcast);
