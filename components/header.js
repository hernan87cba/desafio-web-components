function createHeader(headerContainerEl) {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");
  headerEl.innerHTML = `
          <a href="./index.html">
            <img class="header__home-logo" src="./images/camara.png" />
          </a>
          <img class="header__menu-logo" src="./images/menu.svg" />
          <nav class="header__menu-nav">
            <a
              class="header__menu-nav__link poppins-regular"
              href="./portfolio.html"
              >Portfolio</a
            >
            <a
              class="header__menu-nav__link poppins-regular"
              href="./servicios.html"
              >Servicios</a
            >
            <a
              class="header__menu-nav__link poppins-regular"
              href="./contacto.html"
              >Contacto</a
            >
          </nav>
          <div class="header__menu-window">
          <div class="header__menu-window__close-div">
          <img class="header__menu__close-btn" src="./images/close.svg" />
          </div>
          <nav class="header__menu__links-div">
          <a class="header__menu__link poppins-medium" href="./portfolio.html"
          >Portfolio</a
          >
          <a class="header__menu__link poppins-medium" href="./servicios.html"
          >Servicios</a
          >
          <a class="header__menu__link poppins-medium" href="./contacto.html"
          >Contacto</a
          >
          </nav>
          </div>
          </header>                
  `;
  headerContainerEl.appendChild(headerEl);
}
