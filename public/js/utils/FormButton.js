export default class FormButton {
  constructor(element) {
    this.element = element;
  }

  disable() {
    this.element.setAttribute("disabled", "disabled");
    return this.element;
  }

  enable() {
    this.element.removeAttribute("disabled");
    return this;
  }
}
