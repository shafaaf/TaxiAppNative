import RNGooglePlaces from 'react-native-google-places';
import calculateFare from "./utils/fareCalculator.js";
import constants from './utils/actionConstants';

// Reducers
const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_ADDRESS_PREDICTIONS,
	SET_LOCATION_INPUT,
	REMOVE_PREDICTIONS,
	SET_FARE,
	BOOK_ROUTE
} = constants;

// Functions to dispatch actions

// Called initially on startup
export function setName(){
	// console.log("action dispatched: setName()");
	return  {
		type: SET_NAME,
		payload: "Shafaaf"
	}
}

// Called initially on startup
export function getCurrentLocation(){
	// console.log("action dispatched: getCurrentLocation()");
	return(dispatch) => {
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

// Called when setting pickUp or dropOff locations
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

// Get predictions from user's pickup and dropoff locations
export function getAddressPredictions(payload){
	// console.log("action dispatched: getAddressPredictions(). payload is: ", payload);
		let inputForPredictions = payload.value;
		// console.log("inputForPredictions is: ", inputForPredictions);
		return(dispatch) => {
			RNGooglePlaces.getAutocompletePredictions(inputForPredictions, {
				country: 'CA'
			})
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

// Called when switching between src and destination and so remove old predictions
export function removePredictions(){
	return  {
		type: REMOVE_PREDICTIONS,
		payload: []
	}
}

export function setFare(payload){
	return  {
		type: SET_FARE,
		payload: payload
	}	
}

// Called when selected a predicted address
export function getDistanceTimeLocations(payload){
	console.log("getDistanceTimeLocations: payload is: ", payload);
	const dummyNumbers ={
		baseFare:0.4,
		timeRate:0.14,
		distanceRate:0.97,
		surge:1
	};
	return(dispatch, store) => {
		let pickUpPlaceId = store().LocationInputsReducer.pickUp.placeId;
		let dropOffPlaceId = store().LocationInputsReducer.dropOff.placeId;
		let travelMode = "driving";
		if((pickUpPlaceId == null) || (dropOffPlaceId == null)){
			console.log("getDistanceTimeLocations: One of locations inputs null so returning.");
			// Todo: Show modal here
			return;
		}
		return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=place_id:${pickUpPlaceId}&destinations=place_id:${dropOffPlaceId}&&mode=${travelMode}&key=AIzaSyCtandrDcR3vxWwNpGkacvI4Wxld1SsJwg`)
		.then(
			response => response.json(),
			// Do not use catch, because that will also catch
			// any errors in the dispatch and resulting render,
			// causing a loop of 'Unexpected batch number' errors.
			// https://github.com/facebook/react/issues/6895
			error => console.log('An error occured.', error)
		)
		.then( json => {
			console.log("json is: ", json);
			let filteredOutput = {};
			filteredOutput["origin"] = json.origin_addresses[0];
			filteredOutput["destination"] = json.destination_addresses[0];
			filteredOutput["distanceText"] = json.rows[0]["elements"][0]["distance"]["text"];
			filteredOutput["distanceValue"] = json.rows[0]["elements"][0]["distance"]["value"];
			filteredOutput["durationText"] = json.rows[0]["elements"][0]["duration"]["text"];		
			filteredOutput["durationValue"] = json.rows[0]["elements"][0]["duration"]["value"];		
			console.log("filteredOutput is: ", filteredOutput);
			const fare = calculateFare(
				dummyNumbers.baseFare,
				dummyNumbers.timeRate,
				filteredOutput["durationValue"],
				dummyNumbers.distanceRate,
				filteredOutput["distanceValue"],
				dummyNumbers.surge,
			);
			dispatch(setFare(fare));
		})
	}
}

// Called when selected pickup, dropoff and click on book
export function bookRoute(payload){
	console.log("bookRoute: payload is: ", payload);
	return(dispatch, store) => {
		let name = store().NameReducer;
		let pickUpPlaceId = store().LocationInputsReducer.pickUp.placeId;
		let dropOffPlaceId = store().LocationInputsReducer.dropOff.placeId;
		let fare = store().FareReducer;
		// console.log("name is: ", name);
		// console.log("pickUpPlaceId is: ", pickUpPlaceId);
		// console.log("dropOffPlaceId is: ", dropOffPlaceId);
		// console.log("fare is: ", fare);
		// Todo: Have checks here to make sure all values are valid
		var data = {};
		data.name = name;
		data.pickUpPlaceId = pickUpPlaceId;
		data.dropOffPlaceId = dropOffPlaceId;
		data.fare = fare;
		console.log("data is: ", data);
		var url = "http://localhost:8080/api/bookings"
		var request = new Request(url, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(data)
		});
		fetch(request)
			.then(function(response) {
				console.log("response is: ", response);
			})		
			.catch(function (error){
    			console.log('bookRoute: error in booking route: ', error);
    			reject(error);
  			})	
	} 
}
