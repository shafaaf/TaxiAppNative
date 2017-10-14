const initialState = {
  name: "testName",
  location: "testLocation",
  locationInputs: {
  	"pickUp": null,
  	"dropOff": null,
  	"selectedInputField": null
  },
  locationPredictions: {
  	"inputFieldSelected": "testInputFieldSelected",
  	"predictions": []
  }
};

export default initialState;
