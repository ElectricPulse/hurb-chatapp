import FormButton from "../utils/FormButton.js";
import FormInput from "../utils/FormInput.js";

class chatForm {
  form = document.querySelector("form");
  formInput = new FormInput(document.querySelector(".message_input"));
  formButton = new FormButton(document.querySelector(".send_message"));

  constructor() {
    this.formInput.element.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) this.formButton.element.click();
    });
  }

  addOnSubmitHandler(callback) {
    this.form.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();

        let message = this.formInput.element.textContent;

        this.formButton.disable();

        await callback(message);
      } catch (error) {
        alert(error);
      } finally {
        this.formButton.enable();
        this.formInput.clear().focus();
      }
    });
  }
}

export default new chatForm();
