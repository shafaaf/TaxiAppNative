import React from "react";
import PropTypes from 'prop-types';
import {Text} from "react-native";
import { View} from "native-base";

import styles from "./styles.js";

const Fare = (props) => {
	return (
		<View style={styles.fareContainer}>
			<Text>
				<Text style={styles.fareText}> FARE: RM</Text> <Text style={styles.amount}>{props.fare}</Text>
			</Text>
			
		</View>

	);
}

Fare.propTypes = {
	fare: PropTypes.number.isRequired
};


export default Fare;
