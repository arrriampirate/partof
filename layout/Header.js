import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

@withRouter
@connect(mapStateToProps)
export default class Header extends Component {
  render() {
    return (
      <header className="header">
      </header>
    )
  }
}
