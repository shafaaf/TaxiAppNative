import { combineReducers } from 'redux';
import { 
	NameReducer, 
	LocationReducer,
	LocationInputsReducer,
	LocationPredictionsReducer
} from '../routes/Home/reducers';

export const makeRootReducer = () => {
	return combineReducers({
		NameReducer,	//user's name
		LocationReducer,	//intial autodetected location of passenger
		LocationInputsReducer,	// inputs for pickup and destination addresses
		LocationPredictionsReducer	// predictions when autocompleting inputs
	});
}

export default makeRootReducer
