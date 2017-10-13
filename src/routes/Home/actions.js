// import RNGooglePlaces from 'react-native-google-places';
import constants from './utils/actionConstants';
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_LOCATION_INPUT 
} = constants;

// Functions to dispatch actions

/*
export function getAddressPredictions(){
	console.log("action dispatched: getAddressPredictions()");
	return (dispatch, store) => {
		console.log("store is: ", store());
		let userInput = store().LocationInputsReducer.selectedInputField;		
		RNGooglePlaces.getAutocompletePredictions(userInput,
			{
				country:"MY"
			}
		)
		.then((results)=>
			console.log("results is: ", results)
		)
		.catch((error)=> console.log(error.message));
	}
} 
*/

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
	// console.log("action dispatched: getLocationInput()- payload is: ", payload);
	return  {
		type: GET_LOCATION_INPUT,
		payload
	}
}

