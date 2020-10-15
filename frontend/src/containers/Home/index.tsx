import React, { memo } from "react";
import { connect, ConnectedProps } from "react-redux";

import { ApplicationState } from "../../reducers";
import { Dispatch } from "../../common/types";
import { getPodcast, PodcastState } from "../../reducers/PodcastReducer";
import { selectPodcast } from '../../actions/PodcastActions';

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


const Home = memo((props: Props) => {
  return (
    <>
      <h1 onClick={() => props.selectPodcast('http://google.com')}>Hello!</h1>
      { (props.podcast) ? <h2>name: { props.podcast?.name }</h2> :  '' }
    </>
  )
})

export default connector(Home);

