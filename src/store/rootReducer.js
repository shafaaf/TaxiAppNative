import { combineReducers } from 'redux';
import { 
	NameReducer, 
	LocationReducer,
	LocationInputsReducer,
	ToggleLocationPredictionModalReducer
} from '../routes/Home/reducers';

export const makeRootReducer = () => {
	return combineReducers({
		NameReducer,
		LocationReducer,
		LocationInputsReducer,
		ToggleLocationPredictionModalReducer
	});
}

export default makeRootReducer
