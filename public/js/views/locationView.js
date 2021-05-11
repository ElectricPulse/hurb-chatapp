import View from "./View.js";

class LocationMessageView extends View {
  container = document.querySelector(".messages_container");

  template = document.querySelector(".location_message_template").innerHTML;
}

export default new LocationMessageView();
