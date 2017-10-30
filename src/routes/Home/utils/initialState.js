const initialState = {
  name: null,
  location: null,
  locationInputs: {
    pickUp: {
      "placeId": null,
      "fullText": null
    },
  	dropOff: {
      "placeId": null,
      "fullText": null
    },
  	"selectedInputField": null
  },
  locationPredictions: {
  	"inputFieldSelected": null,
  	"predictions": []
  },
  fare: null
};

export default initialState;
