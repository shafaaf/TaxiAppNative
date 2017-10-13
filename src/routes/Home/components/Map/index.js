import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';

import styles from './styles';

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
	  		<SearchBox getLocationInput={props.getLocationInput}/>
	  		<SearchResults/>
	    </View>
    );
}

export default MapContainer;
