import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles';

var predictions = [
	"asa","Asas","Asa"
];
export const SearchResults = (props) => {
	function handleSelectedAddress(fullText){
		// console.log("handleSelectedAddress- fullText is: ", fullText);
		props.setLocationInput(fullText, props.locationPredictions.inputFieldSelected);
		props.hideLocationPredictionsModal();
	}
	return ( 
		<View style={styles.searchResultsWrapper}>
			<List 
				dataArray={props.locationPredictions.predictions}
				renderRow={(item)=>
				<View>
					<ListItem button avatar onPress={()=>handleSelectedAddress(item.fullText)}>
						<Left style={styles.leftContainer}>
							<Icon style={styles.leftIcon} name="location-on" />
						</Left>
						<Body>
							<Text style={styles.primaryText}>{item.primaryText}</Text>
							<Text style={styles.secondaryText}>{item.secondaryText}</Text>
						</Body>
					</ListItem>
				</View>
			}/>
		</View>
	);
}

SearchResults.propTypes = {
	locationPredictions: PropTypes.object.isRequired,
	hideLocationPredictionsModal: PropTypes.func.isRequired,
	setLocationInput: PropTypes.func.isRequired
};

export default SearchResults;
