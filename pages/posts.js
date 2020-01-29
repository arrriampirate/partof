import React, {Component} from 'react';
import {resolve} from 'react-resolver';
import api from './../api/api';
import {loadingPageEnd, loadingPageStart} from '../utils/dom';
import PostItem from '../components/posts/postItem';

@resolve('data', props => {
  loadingPageStart();
  return api.get.posts();
})
export default class Posts extends Component {
  constructor(props) {
    super(props);
    loadingPageEnd();

    this.toggle = this.toggle.bind(this);
    this.state = this.props.data;
  }

  toggle(id) {
    api.post.togglePost(id).then(() => {
      this.setState({
        items: this.state.items.map(el => {
          if (el.id === id) el.active = !el.active;
          return el;
        })
      })
    })
  };

  render() {
    const {items} = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th/>
            <th>#</th>
            <th>Название</th>
            <th>Поток</th>
            <th>Автор</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {items.map(el => <PostItem key={el.id} {...el} toggle={this.toggle}/>)}
        </tbody>
      </table>
    )
  }
}
