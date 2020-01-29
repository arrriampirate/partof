import React, {Fragment, Component} from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import penIcon from '../images/pen.png';
import listIcon from '../images/list.png';
import usersIcon from '../images/users.png';
import settingsIcon from '../images/settings.png';
import userIcon from '../images/user.png';
import exitIcon from '../images/exit.png';
import magIcon from '../images/mag.png';

/*const icons = {
  'pen': penIcon,
  'list': listIcon,
  'users': usersIcon,
  'settings': settingsIcon,
  'user': userIcon,
  'exit': exitIcon,
  'mag': magIcon,
};*/

const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50px;
  height: 100%;
  background: #313131;
`;

const Nav = styled.ul`
  margin: ${props => props.top ? '0' : '0 0 auto'};
  padding: 0;
  list-style: none;
`;

const LogoLink = styled(NavLink)`
  width: 50px;
  height: 50px;
  background-color: #009688;
  background-image: url('../images/logo.png');
`;

const StyledLink = styled(NavLink)`
  display: block;
  height: 50px;
  transition: opacity .2s ease;
  opacity: .5;
  background-image: url(${magIcon});
 
  &:hover,
  &.active {
    opacity: 1;
  }
`;

export default class Layout extends Component {
  render() {
    const {children} = this.props;
    return (
      <Fragment>
        <Aside>
          <LogoLink to="/"/>
          <Nav top>
            <li><StyledLink to="/blank/" icon="new">5</StyledLink></li>
            <li><StyledLink to="/posts/" icon="list">5</StyledLink></li>
            <li><StyledLink to="/users/" icon="users">5</StyledLink></li>
            <li><StyledLink to="/users-add/" icon="users">5</StyledLink></li>
            <li><StyledLink to="/users-add/" icon="settings">5</StyledLink></li>
          </Nav>
          <Nav>
            <li><StyledLink to="/" icon="pen">5</StyledLink></li>
            <li><StyledLink to="/" icon="user">5</StyledLink></li>
            <li><StyledLink to="/" icon="exit">5</StyledLink></li>
            <li><StyledLink to="/" icon="mag">5</StyledLink></li>
          </Nav>
        </Aside>
        <main className="main">
          <h1 className="main__title">Список статей</h1>
          <div className="main__content">
            {children}
          </div>
        </main>
      </Fragment>
    )
  }
}