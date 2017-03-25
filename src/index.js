import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Core from './Containers/Core/';
import '../public/styles/core.scss';
import { reducers, middlewares } from './Store/store.js';
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { cyan, amber } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

import 'rxjs';
import 'normalize.css';
import './Styles/core/_fonts.scss';

injectTapEventPlugin();

const appStore = createStore(
  reducers,
  middlewares
);

function createStyleManager() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: cyan,
        accent: amber,
        type: 'light',
      }),
    }),
  });
}

const { styleManager, theme } = createStyleManager();

ReactDOM.render(
  <MuiThemeProvider styleManager={styleManager} theme={theme}>
    <Provider store={appStore}>
      <Core />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
