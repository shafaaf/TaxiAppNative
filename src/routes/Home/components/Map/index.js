import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import styles from './styles';

// https://www.npmjs.com/package/react-native-autocomplete-input

export const MapContainer = (props) => {
	return (
	    <View style={styles.container}>
	    	<MapView
	    		provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={props.region}>
				<MapView.Marker 
					coordinate={props.region}
	  				pinColor="green"/>
	  		</MapView>
	  		<SearchBox 
	  			getLocationInput={props.getLocationInput}
	  			getAddressPredictions={props.getAddressPredictions}/>
	  		{/*<SearchResults/>*/}
	  		{/* Todo: Fix this */}
	  		<TouchableOpacity
          		style={styles.button}
          		onPress={() => console.log("What a press")}>
          		<Text>Open Place Picker</Text>
        	</TouchableOpacity>
	    	
	    </View>
    );
}

MapContainer.propTypes = {
	region: PropTypes.object.isRequired,
	getLocationInput: PropTypes.func.isRequired,
	getAddressPredictions: PropTypes.func.isRequired
};

export default MapContainer;
