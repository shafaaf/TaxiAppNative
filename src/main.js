// This file just initializes store and 
// sets up main app container

import React from 'react';
import createStore from './store/createStore';
import AppContainer from './AppContainer';

export default class Main extends React.Component {
	render() {
		const initialState = window.___INTITIAL_STATE__;
		const store = createStore(initialState);
	    return (
	    	<AppContainer store={store} />
	    );
  	}
}
