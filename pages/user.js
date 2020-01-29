import React, {Fragment, Component} from 'react';
import {resolve} from 'react-resolver';
import api from './../api/api';
import {loadingPageEnd, loadingPageStart} from '../utils/dom';
import AddUserForm from '../components/users/addUserForm';

@resolve('data', props => {
  loadingPageStart();
  return api.get.user(props.match.params.id);
})
export default class User extends Component {
  constructor(props) {
    super(props);
    loadingPageEnd();
  }

  render() {
    const user = this.props.data;
    return (
      <Fragment>
        <AddUserForm
          id={user.id}
          name={user.name}
          email={user.email}
          slug={user.slug}
          text={user.text}
          image={user.image}
          links={user.links}
        />
      </Fragment>
    )
  }
}