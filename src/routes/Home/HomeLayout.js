import React from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base';

import HeaderComponent from '../../components/Header'
import FooterComponent from '../../components/Footer'
import MapContainer from './components/Map'

import Fare from "./components/Fare";
import FloatingActionButton from "./components/FloatingActionButton";

const taxiLogo = require("../../assets/images/whiteLogo.png");

class HomeLayout extends React.Component {
	componentDidMount(){
		this.props.actions.setName();
		this.props.actions.getCurrentLocation();
		
		var timerid = setTimeout(() => {
  			this.props.actions.getNearByDrivers();
		}, 2000);
	}

	renderFareComponent(){
		console.log("this.props.fare is: ", this.props.fare);
		if(this.props.fare){
			return (
				<View>
					<Fare fare={this.props.fare} />
					<FloatingActionButton bookRoute={this.props.actions.bookRoute}/>
				</View>	
			);
		}
	}

	render() {
		// Toronto location
		const region = {
			latitude: 43.670622,
      		longitude: -79.386530,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		}
		// If received current location
		if(this.props.location){
			return (
				<Container>
					<HeaderComponent logo={taxiLogo} />
				   	<MapContainer 
					   	region={region}
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
