import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restoreSession } from 'actions/auth';
import { personLiveQueryListener } from 'actions/person';
import Header from 'components/Header';
import Preloader from 'components/Preloader';
import 'components/App.css';

class App extends Component {
  componentDidMount() {
    this.props.restoreSession();
    this.liveQuerySubscription = this.props.personLiveQueryListener();
  }

  componentWillUnmount() {
    this.liveQuerySubscription.unsubscribe();
  }

  render() {
    const { shouldShowPreloader, children } = this.props;
    return (
      <div className="app-wrapper">
        <Header />
        <div className="content-wrapper">
          <div className="content-holder">
            {
              shouldShowPreloader ? <Preloader /> : children
            }
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  shouldShowPreloader: PropTypes.bool,

  personLiveQueryListener: PropTypes.func.isRequired,
  restoreSession: PropTypes.func.isRequired,
};

App.defaultProps = {
  children: null,
  shouldShowPreloader: false,
};

const select = state => ({
  error: state.error,
  shouldShowPreloader: state.auth.shouldShowPreloader
});

const actions = {
  restoreSession,
  personLiveQueryListener
};

export default connect(select, actions)(App);
