import React from 'react';
import PropTypes from 'prop-types';

import { Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

import SearchBox from '../SearchBox';
import SearchResults from '../SearchResults';
import styles from './styles';

// https://www.npmjs.com/package/react-native-autocomplete-input

class MapContainer extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
      		showLocationPredictions: false
      	}
	}

	showLocationPredictionsModal(){
		this.setState({ 
			showLocationPredictions: true
		});
	}

	hideLocationPredictionsModal(){
		this.setState({
			showLocationPredictions: false
		});
	}
	

	renderLocationPredictionsDropdown(){
		if(this.state.showLocationPredictions)
			return (
				<SearchResults 
					locationPredictions = {this.props.locationPredictions}
					hideLocationPredictionsModal = {this.hideLocationPredictionsModal.bind(this)}
					setLocationInput = {this.props.setLocationInput} />
			);
	} 
	render() {
		return (
		    <View style={styles.container}>
		    	<MapView
		    		provider={MapView.PROVIDER_GOOGLE}
					style={styles.map}
					region={this.props.region}>
					<MapView.Marker 
						coordinate={this.props.region}
		  				pinColor="green"/>
		  		</MapView>
		  		<SearchBox 
		  			locationInputs = {this.props.locationInputs}
		  			setLocationInput={this.props.setLocationInput}
		  			getAddressPredictions={this.props.getAddressPredictions}
		  			toggleLocationPredictionsModal={this.showLocationPredictionsModal.bind(this)} />
		  		{this.renderLocationPredictionsDropdown()}
		    </View>
    	);
	}	
}

MapContainer.propTypes = {
	region: PropTypes.object.isRequired,
	locationInputs: PropTypes.object.isRequired,
	locationPredictions: PropTypes.object.isRequired,
	setLocationInput: PropTypes.func.isRequired,
	getAddressPredictions: PropTypes.func.isRequired
};

export default MapContainer;
