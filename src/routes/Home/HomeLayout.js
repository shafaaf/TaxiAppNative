import React from 'react';
import { View, Text } from 'react-native';

import { Container, Header, Content, Spinner } from 'native-base';

import MapContainer from './components/Map'

class HomeLayout extends React.Component {
	componentDidMount(){
		console.log("Home: componentDidMount called");
		this.props.setName();
		this.props.getCurrentLocation();
		this.props.getAddressPredictions();
	}

	render() {
		// Toronto location
		const region = {
			latitude: 23.810332,
      		longitude: 90.412518,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		}
		if(this.props.location.latitude){
			return (
				<Container> 
				   	<MapContainer 
					   	region={this.props.location}
					   	getLocationInput={this.props.getLocationInput}/>
				</Container>
	    	);
		}
		else{
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
