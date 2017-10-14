import RNGooglePlaces from 'react-native-google-places';

import constants from './utils/actionConstants';

// Reducers
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_LOCATION_INPUT,
	GET_ADDRESS_PREDICTIONS
} = constants;

// Functions to dispatch actions

export function setName(){
	// console.log("action dispatched: setName()");
	return  {
		type: SET_NAME,
		payload: "Shafaaf"
	}
}

export function getCurrentLocation(){
	// console.log("action dispatched: getCurrentLocation()");
	return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:GET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error) => console.log(error.message),
				{enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
		);
	}
}

// Get input from user for pickup or dropoff locations
export function getLocationInput(payload){
	console.log("action dispatched: getLocationInput()- payload is: ", payload);
	return  {
		type: GET_LOCATION_INPUT,
		payload
	}
}

// Get predictions from user pickup and dropoff locations
export function getAddressPredictions(payload){
	console.log("action dispatched: getAddressPredictions(). payload is: ", payload);
		let inputForPredictions = payload.value;
		console.log("inputForPredictions is: ", inputForPredictions);
		return(dispatch) => {
			RNGooglePlaces.getAutocompletePredictions(inputForPredictions)
		    .then((results) => {
		    	console.log("results is: ", results);
		    	dispatch({
					type: GET_ADDRESS_PREDICTIONS,
					payload: results
				});
		    })
		    .catch((error) => console.log(error.message));
		}
}
