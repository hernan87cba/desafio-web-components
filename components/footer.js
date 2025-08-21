function createFooter(footerSectionEl) {
  const footerEl = document.createElement("footer");
  footerEl.classList.add("footer");
  footerEl.innerHTML = `<a href="./index.html">
          <img class="header__home-logo" src="./images/camara.png" />
        </a>
        <nav class="footer__links-nav">
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./images/home.svg" />
            <a class="footer__link poppins-regular" href="./index.html">Home</a>
          </div>
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./images/user.svg" />
            <a class="footer__link poppins-regular" href="./servicios.html">
              Servicios</a
            >
          </div>
          <div class="footer__link-div">
            <img class="footer__link-icon" src="./images/phone.svg" />
            <a class="footer__link poppins-regular" href="./contacto.html"
              >Contacto</a
            >
          </div>
        </nav>
        <nav class="footer__social-nav">
          <a
            class="footer__social-link"
            href="https://www.linkedin.com/in/hern%C3%A1n-decicco-3a7380207/"
            target="_blank"><img src="./images/linkedin.png"
          /></a>
          <a class="footer__social-link" href="https://github.com/hernan87cba"
            target="_blank"><img src="./images/github.png"
          /></a>
          <a class="footer__social-link" href="https://x.com/apxschool"
            target="_blank"><img src="./images/twitter.png"
          /></a>
        </nav>
        <a class="footer__apx-link poppins-regular" href="https://apx.school"
          target="_blank">©2025 - https://apx.school</a
        >
  `;
  footerSectionEl.appendChild(footerEl);
}
