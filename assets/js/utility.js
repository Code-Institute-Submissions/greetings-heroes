/**
 * Hides all UI elements and shows only the specified one
 * @param {string} section The HTML element which should be visible after calling the function
 * @return {void}
 */
export const updateUi = (section) => {
  const uiElements = document.querySelectorAll(".ui-element");
  for (const ui in uiElements) {
    if (uiElements.hasOwnProperty(ui)) {
      const element = uiElements[ui];
      element.classList.add("hidden");
    }
  }
  if (document.getElementById(section).classList.contains("hidden")) {
    document.getElementById(section).classList.remove("hidden");
  }
};

export const listen = (listenElementId, triggeredEvent, option) => {
  option = option || "";
  document.getElementById(listenElementId).addEventListener("click", () => {
    triggeredEvent(option);
  });
};

export const updateAndListen = (uiToUpdate, listenElementId, triggeredEvent, option) => {
  option = option || "";
  updateUi(uiToUpdate);
  listen(listenElementId, () => {
    triggeredEvent(option);
  });
};
