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

function loadData(space_id, environment_id, content_model, access_token) {
  const contentfulURL = `https://cdn.contentful.com/spaces/${space_id}/environments/${environment_id}/entries?access_token=${access_token}&content_type=${content_model}`;

  fetch(contentfulURL)
    .then((response) => response.json())
    .then((data) => {
      const bienvenidaTitleWhiteEl = document.querySelector(
        ".bienvenida__title-white"
      );
      bienvenidaTitleWhiteEl.textContent =
        data.items[0].fields.bienvenidaTitleWhite;

      const bienvenidaTitleCyanEl = document.querySelector(
        ".bienvenida__title-cyan"
      );

      bienvenidaTitleCyanEl.textContent =
        data.items[0].fields.bienvenidaTitleCyan;

      const presentacionTitleEl = document.querySelector(
        ".presentacion__title"
      );
      presentacionTitleEl.textContent = data.items[0].fields.presentacionTitle;

      const presentacionDescriptionEl = document.querySelector(
        ".presentacion__description"
      );
      presentacionDescriptionEl.textContent =
        data.items[0].fields.presentacionDescription;

      const serviciosTitleWhiteEl = document.querySelector(
        ".servicios__title-white"
      );
      serviciosTitleWhiteEl.textContent =
        data.items[0].fields.serviciosTitleWhite;

      const serviciosTitleCyanEl = document.querySelector(
        ".servicios__title-cyan"
      );
      serviciosTitleCyanEl.textContent =
        data.items[0].fields.serviciosTitleCyan;

      /*Busqueda de imagenes del sitio*/
      const imgArray = data.includes.Asset;

      const bienvenidaImgEl = document.querySelector(".bienvenida__img");

      const bienvenidaImgTitle = "bienvenida";
      const bienvenidaItem = imgArray.find(
        (item) => item.fields.title == bienvenidaImgTitle
      );
      const bienvenidaImgUrl = bienvenidaItem.fields.file.url;

      bienvenidaImgEl.setAttribute("src", bienvenidaImgUrl);
      bienvenidaImgEl.setAttribute("alt", bienvenidaImgTitle);

      const presentacionImgEl = document.querySelector(".presentacion__img");

      const presentacionImgTitle = "fotoHernan";
      const presentacionItem = imgArray.find(
        (item) => item.fields.title == presentacionImgTitle
      );
      const presentacionImgUrl = presentacionItem.fields.file.url;
      presentacionImgEl.setAttribute("src", presentacionImgUrl);
      presentacionImgEl.setAttribute("alt", presentacionImgTitle);
    })
    .catch((error) => console.error("Error:", error));
}

function loadCardsContainer(
  containerEl,
  space_id,
  environment_id,
  content_model,
  access_token
) {
  const contentfulURL = `https://cdn.contentful.com/spaces/${space_id}/environments/${environment_id}/entries?access_token=${access_token}&content_type=${content_model}&order=sys.createdAt`;

  fetch(contentfulURL)
    .then((response) => response.json())
    .then((data) => {
      const itemsArray = data.items;
      const imgArray = data.includes.Asset;

      if (itemsArray != undefined && itemsArray.length > 0) {
        const cardsContainerEl = document.createElement("div");
        cardsContainerEl.classList.add("cards__container");

        //Este if me va a limitar la cantidad de cards a 3 si es que hay más de 3 servicios. Si hay menos de tres,
        //la cantidad de vueltas va a ser igual a la cantidad de items (si seteara i < 3 me tiraría un error)
        let cantItems = 3;
        if (itemsArray.length < 3) {
          cantItems = itemsArray.length;
        }

        for (let i = 0; i < cantItems; i++) {
          /*Busco la data (titulo, descripcion y el id de la imagen)*/
          const cardTitle = itemsArray[i].fields.cardTitle;
          const cardDescription = itemsArray[i].fields.cardDescription;
          const cardImgId = itemsArray[i].fields.cardImg.sys.id;

          /*Con el id de la imagen, la busco en el array de Assets*/
          const cardImgData = imgArray.find((item) => {
            if (cardImgId == item.sys.id) {
              return item.fields;
            }
          });
          const cardImgAlt = cardImgData.fields.title;
          const cardImgUrl = cardImgData.fields.file.url;
          createCard(
            cardsContainerEl,
            cardTitle,
            cardDescription,
            cardImgAlt,
            cardImgUrl
          );
        }
        containerEl.appendChild(cardsContainerEl);
      }
    })
    .catch((error) => console.error("Error:", error));
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
  //Cargo la data del sitio
  const space_id = "7vv2lhz9jyqw";
  const environment_id = "hernan-environment";
  let content_model = "desafioWebComponents";
  const access_token = "Iq6BgKFE3H9k0T5NRKKkKq2uc5KXo7_9tVMKPpOwFRU";
  loadData(space_id, environment_id, content_model, access_token);

  //Creo el contenedor con sus cards
  const containerEl = document.querySelector(".servicios-section");
  content_model = "serviciosCards";
  loadCardsContainer(
    containerEl,
    space_id,
    environment_id,
    content_model,
    access_token
  );

  //Cargo el formulario
  loadContactForm();

  //Cargo el footer
  loadFooter();
}
main();
