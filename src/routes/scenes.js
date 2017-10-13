// This file contains all our routes defined

import React from "react";
import { Actions, Scene } from "react-native-router-flux";

import HomeContainer from './Home/HomeContainer';

const scenes = Actions.create(
	<Scene key="root">
		<Scene key="home" component={HomeContainer} title="homeTitle" initial />
	</Scene>
);

export default scenes;
