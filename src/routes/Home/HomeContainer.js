import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomeLayout from './HomeLayout';
import * as actions from './actions';

const mapStateToProps = (state) => ({
	name: state.NameReducer,
	location: state.LocationReducer,
	locationInputs: state.LocationInputsReducer,
	toggleLocationPredictionModal: state.ToggleLocationPredictionModalReducer
});

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(Object.assign(actions), dispatch)}
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
