import { Dimensions } from "react-native";
import initialState from './utils/initialState'
import constants from './utils/actionConstants';

const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_ADDRESS_PREDICTIONS,
	SET_LOCATION_INPUT,
	REMOVE_PREDICTIONS,
	SET_FARE
} = constants;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

export function NameReducer(state=initialState.name, action) {
	// console.log("\n===Reducer NameReducer running.");
	// console.log("state is: ", state);
	// console.log("action is: ", action);
	switch(action.type) {
		case SET_NAME:
			// console.log("NameReducer: SET_NAME.");		
			return action.payload;
		default:
			// console.log("NameReducer: default."); 
			return state;
	}
}

export function LocationReducer(state=initialState.location, action) {
	// console.log("\n===Reducer LocationReducer running.");
	// console.log("state is: ", state);
	// console.log("action is: ", action);
	switch(action.type) {
		case GET_CURRENT_LOCATION:
			// console.log("LocationReducer: GET_CURRENT_LOCATION.");		
			return Object.assign({}, 
				{latitude: action.payload.coords.latitude},
				{longitude: action.payload.coords.longitude},
				{latitudeDelta: LATITUDE_DELTA},
				{longitudeDelta: LONGITUDE_DELTA}
			);
		default:
			// console.log("LocationReducer: default."); 
			return state;
	}
}

export function LocationInputsReducer(state=initialState.locationInputs, action) {
	// console.log("\n===Reducer LocationInputsReducer running.");
	// console.log("LocationInputsReducer: state is: ", state);
	// console.log("LocationInputsReducer: action is: ", action);
	switch(action.type) {
		case SET_LOCATION_INPUT:
			//console.log("LocationInputsReducer: SET_LOCATION_INPUT")
			var newData = {};
			var inputType =  action.payload.inputType;
			var location =  action.payload.location;
			newData[inputType] = location;
			return Object.assign({}, state, newData);
		default:
			// console.log("LocationInputsReducer: default."); 
			return state;
	}
}

export function LocationPredictionsReducer(state=initialState.locationPredictions, action) {
	// console.log("\n===Reducer LocationPredictionsReducer running.");
	// console.log("LocationPredictionsReducer: state is: ", state);
	// console.log("LocationPredictionsReducer: action is: ", action);
	switch(action.type) {
		case GET_ADDRESS_PREDICTIONS:
			// console.log("LocationPredictionsReducer: GET_ADDRESS_PREDICTIONS.");
			var newData = {};
			newData.inputFieldSelected = action.payload.inputType;
			newData.predictions = action.payload.predictions;
			return Object.assign({}, newData);
		case REMOVE_PREDICTIONS:
			// console.log("LocationPredictionsReducer: REMOVE_PREDICTIONS");
			return Object.assign({}, state, {
				predictions: []
			});
		default:
			// console.log("LocationPredictionsReducer: default."); 
			return state;
	}
}

export function FareReducer(state=initialState.fare, action){
	// console.log("FareReducer: state is: ", state);
	// console.log("FareReducer: action is: ", action);
	switch(action.type) {
		case SET_FARE:
			// console.log("FareReducer: SET_FARE");
			return action.payload;
		default:
			return state;
	}
}
