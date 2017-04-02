import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Home from './views/home';

ReactDOM.render(
	<MuiThemeProvider>
		<Router history={hashHistory}>
			<Route path="/" component={Home} />
		</Router>
	</MuiThemeProvider>,
  	document.getElementById('mountapp')
);