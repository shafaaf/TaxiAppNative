import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';

import HeaderComponent from '../../components/Header'
import FooterComponent from '../../components/Footer'
import MapContainer from './components/Map'

import Fare from "./components/Fare";

const taxiLogo = require("../../assets/images/whiteLogo.png");

class HomeLayout extends React.Component {
	componentDidMount(){
		this.props.actions.setName();
		this.props.actions.getCurrentLocation();
	}

	renderFareComponent(){
		console.log("this.props.fare is: ", this.props.fare);
		if(this.props.fare){
			return (
				<Fare fare={this.props.fare} />
			);
		}
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
		if(this.props.location){
			return (
				<Container>
					<HeaderComponent logo={taxiLogo} />
				   	<MapContainer 
					   	region={this.props.location}
					   	locationInputs = {this.props.locationInputs}
					   	locationPredictions = {this.props.locationPredictions}
					   	setLocationInput={this.props.actions.setLocationInput}
					   	getAddressPredictions={this.props.actions.getAddressPredictions} 
					   	getDistanceTimeLocations={this.props.actions.getDistanceTimeLocations} 
					   	removePredictions = {this.props.actions.removePredictions} />
					{this.renderFareComponent()}
					<FooterComponent logo={taxiLogo} />
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
