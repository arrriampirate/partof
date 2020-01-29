import React, {Fragment, Component} from 'react';
import {resolve} from 'react-resolver';
import api from './../api/api';
import {loadingPageEnd, loadingPageStart} from "../utils/dom";
import PostPage from "../components/post/page";

@resolve('data', props => {
  loadingPageStart();
  return api.get.post(props.match.params.id);
})
export default class Post extends Component {
  constructor(props) {
    super(props);
    loadingPageEnd();
  }

  render() {
    const {active, id, name, user, flow, slug, preview, published, text, image} = this.props.data;
    return (
      <Fragment>
        <PostPage
          id={id}
          active={Boolean(active)}
          name={name}
          slug={slug}
          flow={flow && flow.id}
          user={user && user.id}
          text={preview}
          date={published && new Date(published.timestamp * 1000)}
          imageSrc={image && image.name}
          content={text}
        />
      </Fragment>
    )
  }
}