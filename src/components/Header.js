import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';

import { unAuthUser } from 'actions/auth';
import logo from 'images/logo.svg';
import AvatarPlaceholder from 'components/AvatarPlaceholder';

import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleUserInfoClick = this.handleUserInfoClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      open: false,
      anchorEl: null
    };
  }

  closeDropdown() {
    this.setState({ open: false });
  }

  handleUserInfoClick(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleLogoutClick() {
    this.props.unAuthUser();
    this.closeDropdown();
  }

  render() {
    const { userId, avatar, firstName, lastName } = this.props;

    const displayName = `${firstName} ${lastName}`;

    if (!userId) {
      return null;
    }
    return (
      <AppBar className="header-wrapper">
        <Toolbar className="header">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" />
          </Link>
          <div
            className="user-info"
            ref={(userInfo) => { this.anchorEl = userInfo; }}
            onClick={this.handleUserInfoClick}
            role="button"
            tabIndex={0}
          >
            <div className="username">
              {displayName}
            </div>
            <div className="profile-img-wrapper">
              {
                avatar ? <img src={avatar} alt="Profile" /> : <AvatarPlaceholder />
              }
            </div>
          </div>
          <Menu
            anchorEl={this.anchorEl}
            open={this.state.open}
            onRequestClose={this.closeDropdown}
            className="dropdown"
          >
            <MenuItem>
              <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={this.handleLogoutClick}>
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userId: PropTypes.string,

  unAuthUser: PropTypes.func.isRequired
};

Header.defaultProps = {
  avatar: '',
  firstName: '',
  lastName: '',
  userId: '',
};


const select = state => ({
  avatar: state.auth.avatar,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  userId: state.auth.userId
});

const actions = { unAuthUser };

export default connect(select, actions)(Header);
