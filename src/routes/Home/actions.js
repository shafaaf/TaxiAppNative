import RNGooglePlaces from 'react-native-google-places';

import constants from './utils/actionConstants';

// Reducers
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_ADDRESS_PREDICTIONS,
	SET_LOCATION_INPUT
} = constants;

// Functions to dispatch actions

export function setName(){
	// console.log("action dispatched: setName()");
	return  {
		type: SET_NAME,
		payload: "Shafaaf"
	}
}

export function setLocationInput(inputs){
	console.log("setLocationInput: inputs is: ", inputs);
	return  {
		type: SET_LOCATION_INPUT,
		payload: {
			location: inputs.location,
			inputType: inputs.inputType
		}
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

// Get predictions from user pickup and dropoff locations
export function getAddressPredictions(payload){
	// console.log("action dispatched: getAddressPredictions(). payload is: ", payload);
		let inputForPredictions = payload.value;
		// console.log("inputForPredictions is: ", inputForPredictions);
		return(dispatch) => {
			RNGooglePlaces.getAutocompletePredictions(inputForPredictions)
		    .then((predictions) => {
		    	// console.log("predictions is: ", predictions);
		    	dispatch({
					type: GET_ADDRESS_PREDICTIONS,
					payload: {
						inputType: payload.inputType,
						predictions
					}
				});
		    })
		    .catch((error) => console.log(error.message));
		}
}
