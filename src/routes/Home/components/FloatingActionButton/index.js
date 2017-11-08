import React from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";
import PropTypes from 'prop-types';

import styles from "./styles.js";

export const FloatingActionButton = (props)=>{
	return (
		<Button style={styles.fabContainer} onPress={props.bookRoute}>
			<Text style={styles.btnText}> Book </Text>
		</Button>

	);
}

FloatingActionButton.propTypes = {
	bookRoute: PropTypes.func.isRequired
};


export default FloatingActionButton;
