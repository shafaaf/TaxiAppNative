import { connect } from 'react-redux';
import HomeLayout from './HomeLayout';
import { 
	getAddressPredictions,
	setName, 
	getCurrentLocation,
	getLocationInput
} from './actions';

const mapStateToProps = (state) => ({
	name: state.NameReducer,
	location: state.LocationReducer,
	locationInputs: state.LocationInputsReducer 
});
const mapActionCreators = {
	getAddressPredictions,
	setName,
	getCurrentLocation,
	getLocationInput
};

export default connect(mapStateToProps, mapActionCreators)(HomeLayout);
