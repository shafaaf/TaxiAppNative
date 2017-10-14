import { combineReducers } from 'redux';
import { 
	NameReducer, 
	LocationReducer,
	LocationInputsReducer,
	LocationPredictionsReducer
} from '../routes/Home/reducers';

export const makeRootReducer = () => {
	return combineReducers({
		NameReducer,
		LocationReducer,
		LocationInputsReducer,
		LocationPredictionsReducer
	});
}

export default makeRootReducer
