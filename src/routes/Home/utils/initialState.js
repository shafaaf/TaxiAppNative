const initialState = {
  name: null,
  location: null,
  locationInputs: {
  	"pickUp": null,
  	"dropOff": null,
  	"selectedInputField": null
  },
  locationPredictions: {
  	"inputFieldSelected": null,
  	"predictions": []
  }
};

export default initialState;
