export default class Formmessage_input {
  constructor(element) {
    this.element = element;
  }

  focus() {
    this.element.focus();
    return this;
  }

  clear() {
    this.element.textContent = "";
    return this;
  }
}
