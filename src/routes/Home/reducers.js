import { Dimensions } from "react-native";
import initialState from './utils/initialState'
import constants from './utils/actionConstants';

const { 
	SET_NAME, 
	GET_CURRENT_LOCATION,
	GET_LOCATION_INPUT
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
			console.log("NameReducer: SET_NAME.");		
			return action.payload;
		default:
			console.log("NameReducer: default."); 
			return state;
	}
}

export function LocationReducer(state=initialState.location, action) {
	console.log("\n===Reducer LocationReducer running.");
	// console.log("state is: ", state);
	// console.log("action is: ", action);
	switch(action.type) {
		case GET_CURRENT_LOCATION:
			console.log("LocationReducer: GET_CURRENT_LOCATION.");		
			return Object.assign({}, 
				{latitude: action.payload.coords.latitude},
				{longitude: action.payload.coords.longitude},
				{latitudeDelta: LATITUDE_DELTA},
				{longitudeDelta: LONGITUDE_DELTA}					
			);
		default:
			console.log("LocationReducer: default."); 
			return state;
	}
}

export function LocationInputsReducer(state=initialState.locationInputs, action) {
	// console.log("\n===Reducer LocationInputsReducer running.");
	// console.log("LocationInputsReducer: state is: ", state);
	// console.log("LocationInputsReducer: action is: ", action);
	switch(action.type) {
		case GET_LOCATION_INPUT:
			console.log("LocationInputsReducer: GET_LOCATION_INPUT.");
			var inputType =  action.payload.inputType;
			var value =  action.payload.value;
			var newData = {};
			newData[inputType] = value;
			newData.selectedInputField = inputType;
			return Object.assign({}, state, newData);
			
		default:
			console.log("LocationInputsReducer: default."); 
			return state;
	}
}
