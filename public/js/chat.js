//Importing

import chatView from "./views/chatView.js";
import locationView from "./views/locationView.js";
import chatForm from "./views/chatForm.js";
import locationButton from "./views/locationButton.js";

import * as model from "./model.js";

//Selecting form and form elements
//Selecting location button

const callbackOnMessage = function (templateArgs) {
  chatView.render(templateArgs);
};

const callbackOnLocationMessage = function (templateArgs) {
  locationView.render(templateArgs);
};

model.addOnMessageHandler(callbackOnMessage);
model.addOnLocationMessageHandler(callbackOnLocationMessage);

chatForm.addOnSubmitHandler(model.callbackOnFormSubmit);
locationButton.addOnClickHandler(model.callbackClickHandler);


