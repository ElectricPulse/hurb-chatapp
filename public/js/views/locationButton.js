import FormButton from "../utils/FormButton.js";

class locationButton {
  button = new FormButton(document.querySelector(".send_location"));

  addOnClickHandler(callback) {
    this.button.element.addEventListener("click", async (e) => {
      try {
        this.button.disable();

        await callback();
      } catch (error) {
        alert("Please allow location sharing and try again");
      } finally {
        this.button.enable();
      }
    });
  }
}

export default new locationButton();
