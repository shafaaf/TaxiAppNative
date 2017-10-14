import { combineReducers } from 'redux';
import { 
	NameReducer, 
	LocationReducer,
	LocationInputsReducer,
	LocationInputPredictorsReducer
} from '../routes/Home/reducers';

export const makeRootReducer = () => {
	return combineReducers({
		NameReducer,
		LocationReducer,
		LocationInputsReducer,
		LocationInputPredictorsReducer
	});
}

export default makeRootReducer
