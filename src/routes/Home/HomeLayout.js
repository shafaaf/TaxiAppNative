import React from 'react';
import { View, Text } from 'react-native';

import { Container, Header, Content, Spinner } from 'native-base';

import MapContainer from './components/Map'

class HomeLayout extends React.Component {
	componentDidMount(){
		console.log("Home: componentDidMount called");
		this.props.actions.setName();
		this.props.actions.getCurrentLocation();
		// this.props.actions.getAddressPredictions();
	}

	render() {
		// Toronto location
		const region = {
			latitude: 23.810332,
      		longitude: 90.412518,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		}
		// If received current location
		if(this.props.location.latitude){
			return (
				<Container> 
				   	<MapContainer 
					   	region={this.props.location}
					   	getLocationInput={this.props.actions.getLocationInput}
					   	getAddressPredictions={this.props.actions.getAddressPredictions}/>
				</Container>
	    	);
		}
		// Else, show loading spinner
		else {
			return (
				<View style={styles.loadingContainer}>
			        <Spinner color='black' />
			        <Text>Geting your location bro!</Text>
				</View>
			);
		}
  	}
}

const styles = {
    loadingContainer: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center'
  	}
};

export default HomeLayout;
