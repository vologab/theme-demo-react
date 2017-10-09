import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, red } from 'material-ui/colors';
import 'typeface-roboto/index.css';

import 'font-awesome/css/font-awesome.css';
import 'index.css';

import configureStore from 'store/configureStore';
import createRoutes from 'routes';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      ...red,
      A700: '#D50000'
    }
  }
});


const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router
        routes={routes}
        history={history}
        render={applyRouterMiddleware(useScroll())}
      />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
