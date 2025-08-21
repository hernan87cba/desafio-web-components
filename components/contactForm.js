function createContactForm(formContainerEl) {
  const contactFormEl = document.createElement("form");
  contactFormEl.classList.add("form__escribime");

  contactFormEl.innerHTML = `<div class="form__inputs-div">
            <label class="form__label poppins-bold"
              >Nombre
              <input
              id="form__nombre"
                type="text"
                class="form__input poppins-medium"
                placeholder="Tu nombre" required
              />
            </label>
            <label class="form__label poppins-bold"
              >Email
              <input
              id="form__email"
                type="email"
                class="form__input poppins-medium"
                placeholder="tu@mail.com" required
              />
            </label>
          </div>
          <label class="form__label poppins-bold"
            >Mensaje
            <textarea 
            id="form__mensaje" class="form__textarea poppins-medium" required></textarea>
          </label>
          <button id="form__enviar" class="form__button" disabled>Enviar</button>
`;
  formContainerEl.appendChild(contactFormEl);

  const enviarEl = document.getElementById("form__enviar");

  const nombreEl = document.getElementById("form__nombre");

  nombreEl.addEventListener("input", () => {
    enviarEl.disabled = !contactFormEl.checkValidity();
  });

  const emailEl = document.getElementById("form__email");
  emailEl.addEventListener("input", () => {
    enviarEl.disabled = !contactFormEl.checkValidity();
  });

  const mensajeEl = document.getElementById("form__mensaje");
  mensajeEl.addEventListener("input", () => {
    enviarEl.disabled = !contactFormEl.checkValidity();
  });

  enviarEl.addEventListener("click", (event) => {
    event.preventDefault();
    const from = nombreEl.value;
    const to = emailEl.value;
    const message = mensajeEl.value;

    fetch("https://apx.school/api/utils/email-to-student", {
      method: "POST",
      body: JSON.stringify({
        to: to,
        message: `Mensaje de ${from}: ${message}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        alert("El correo se envió correctamente");
        contactFormEl.reset();
        enviarEl.disabled = true;
      })
      .catch((error) => console.error("Error:", error));
  });
}
