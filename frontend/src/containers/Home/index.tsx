import React, { memo } from "react";
import { Layout, Input } from 'antd';
import { connect, ConnectedProps } from "react-redux";

import { ApplicationState } from "../../reducers";
import { Dispatch } from "../../common/types";
import { getPodcast, PodcastState } from "../../reducers/PodcastReducer";
import { selectPodcast } from '../../actions/PodcastActions';

import './Home.scss';

const mapStateToProps = (state: ApplicationState) => ({
  podcast: getPodcast(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    selectPodcast: (url: string) => dispatch(selectPodcast(url))
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps)

interface Props extends ConnectedProps<typeof connector> {
  podcast: PodcastState | null
}


const BACKEND_URL = process.env.BACKEND_URL;

const Home = memo((props: Props) => {
  return (
    <div className="home">
      <Layout.Content className="home__content">
        <span className="home__title" onClick={() => props.selectPodcast('http://google.com')}>Search Podcast</span>
        <div className="home__search-box">
          <Input.Search 
            enterButton="Search"
            size="large"
            onSearch={ () => console.log(BACKEND_URL) }
            placeholder="TYPE PODCAST URL" />
          { (props.podcast) ? <h2>name: { props.podcast?.name }</h2> :  '' }
        </div>
      </Layout.Content>
    </div>
  )
})

export default connector(Home);

