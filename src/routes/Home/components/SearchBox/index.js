import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { View, InputGroup, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';

export const SearchBox = (props) => {
	function handleInput(inputType, value){
		props.getLocationInput({ //update pickup, dropoff locations
			inputType,
			value
		});
		props.getAddressPredictions({ //get predictions for pickup, dropoff locations
			inputType,
			value
		});
	}
	return (
		<View style={styles.searchBox}>
			<View style={styles.inputWrapper}>
				<Text style={styles.label}>Pick Up</Text>
		    	<InputGroup>
		    		<Icon name="search" size={15} color="#FF5E3A"/>
		    		<Input
		    			onFocus={()=>console.log("pickUp input box clicked on.")}
		    			style={styles.inputSearch} 
		    			placeholder="Choose pickup location."
		    			onChangeText={handleInput.bind(this, "pickUp")}/>
		    	</InputGroup>
		    </View>
		    <View style={styles.secondInputWrapper}>
				<Text style={styles.label}>Drop Off</Text>
		    	<InputGroup>
		    		<Icon name="search" size={15} color="#FF5E3A"/>
		    		<Input 
		    			onFocus={()=>console.log("dropOff input box clicked on.")}
		    			style={styles.inputSearch} 
		    			placeholder="Choose dropOff location."
		    			onChangeText={handleInput.bind(this, "dropOff")}/>
		    	</InputGroup>
		    </View>
	    </View>
    );
}

SearchBox.propTypes = {
	getLocationInput: PropTypes.func.isRequired,
	getAddressPredictions: PropTypes.func.isRequired
};

export default SearchBox;
