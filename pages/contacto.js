function loadHeader() {
  const headerContainerEl = document.querySelector(".header__container");
  createHeader(headerContainerEl);
  const menuButtonEl = document.querySelector(".header__menu-logo");
  const closeButtonEl = document.querySelector(".header__menu__close-btn");
  const menuWindowEl = document.querySelector(".header__menu-window");

  menuButtonEl.addEventListener("click", () => {
    menuWindowEl.style.display = "flex";
    menuWindowEl.style["flex-direction"] = "column";
  });
  closeButtonEl.addEventListener("click", () => {
    menuWindowEl.style.display = "";
  });
}

function loadContactForm() {
  const formContainerEl = document.querySelector(".form__container");
  createContactForm(formContainerEl);
}

function loadFooter() {
  const footerSectionEl = document.querySelector(".footer-section");
  createFooter(footerSectionEl);
}

function main() {
  //Cargo el header
  loadHeader();

  //Cargo el formulario
  loadContactForm();

  //Cargo el footer
  loadFooter();
}
main();
