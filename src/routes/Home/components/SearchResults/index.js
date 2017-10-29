import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { View, List, ListItem, Left, Body } from 'native-base';
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from './styles';

export const SearchResults = (props) => {
	function handleSelectedAddress(fullText, placeId){
		// console.log("handleSelectedAddress- fullText is: ", fullText);
		// console.log("handleSelectedAddress- placeId is: ", placeId);
		// var location = {
		// 	fullText,
		// 	placeId
		// };
		// props.setLocationInput(location, props.locationPredictions.inputFieldSelected);
		props.setLocationInput({ //update pickup, dropoff locations
			location: {
				"fullText" : fullText,
				"placeId": placeId
			},
			inputType: props.locationPredictions.inputFieldSelected
		});
		props.hideLocationPredictionsModal();
		props.getDistanceTimeLocations();	//Could be ract condition here, unsure.
	}
	return (
		<View style={styles.searchResultsWrapper}>
			<List 
				dataArray={props.locationPredictions.predictions}
				renderRow={(item)=>
				<View>
					<ListItem button avatar onPress={()=>handleSelectedAddress(item.fullText, item.placeID)}>
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
	setLocationInput: PropTypes.func.isRequired,
	getDistanceTimeLocations: PropTypes.func.isRequired
};

export default SearchResults;
