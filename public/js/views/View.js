export default class View {
  errorTemplate = document.querySelector(".error_template").innerHTML;

  render(args) {
    const html = Mustache.render(this.template, args);
    this.container.insertAdjacentHTML("beforeend", html);
  }

  renderError(error) {
    const html = Mustache.render(this.errorTemplate, { error });
    this.container.insertAdjacentHTML("beforeend", html);
  }
}
