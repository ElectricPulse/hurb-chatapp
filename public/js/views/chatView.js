import View from "./View.js";

class chatView extends View {
  container = document.querySelector(".messages_container");

  template = document.querySelector(".message_template").innerHTML;
}

export default new chatView();
