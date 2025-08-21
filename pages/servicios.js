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
      const serviciosTitleWhiteEl = document.querySelector(
        ".bienvenida__title-white"
      );
      serviciosTitleWhiteEl.textContent =
        data.items[0].fields.serviciosTitleWhite;

      const serviciosTitleCyanEl = document.querySelector(
        ".bienvenida__title-cyan"
      );

      serviciosTitleCyanEl.textContent =
        data.items[0].fields.serviciosTitleCyan;

      /*Busqueda de imagen del sitio*/
      const imgArray = data.includes.Asset;

      const serviciosImgEl = document.querySelector(".bienvenida__img");

      const serviciosImgTitle = "servicio";
      const serviciosItem = imgArray.find(
        (item) => item.fields.title == serviciosImgTitle
      );
      const serviciosImgUrl = serviciosItem.fields.file.url;

      serviciosImgEl.setAttribute("src", serviciosImgUrl);
      serviciosImgEl.setAttribute("alt", serviciosImgTitle);
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
        //Creo el contenedor principal de cards
        const cardsContainerEl = document.createElement("div");
        cardsContainerEl.classList.add("cards__container");

        //Este if me va a limitar la cantidad de cards a 3 si es que hay más de 3 servicios. Si hay menos de tres,
        //la cantidad de vueltas va a ser igual a la cantidad de items para evitar un error en el for.
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

        //Si hay más de 3 items, voy a crear contenedores extra de hasta 3 items cada uno

        if (itemsArray.length > 3) {
          //Creo una variable auxiliar para controlar la cantidad de items de cada container
          let containerItems = 0;
          let cardsContainerExtraEl = document.createElement("div");
          cardsContainerExtraEl.classList.add("cards__container-extra");
          //Lo llamo container-extra para que al hacer click en Ver Más y Ver Menos,
          //se muestren y oculten sólo estos quedando el primer contenedor siempre visible

          for (let j = 3; j < itemsArray.length; j++) {
            //Cada 3 items creo un contenedor nuevo, j!=3 porque ya creé el primero
            if (j % 3 == 0 && j != 3) {
              cardsContainerExtraEl = document.createElement("div");
              cardsContainerExtraEl.classList.add("cards__container-extra");
            }

            /*Busco la data (titulo, descripcion y el id de la imagen)*/
            const cardTitle = itemsArray[j].fields.cardTitle;
            const cardDescription = itemsArray[j].fields.cardDescription;
            const cardImgId = itemsArray[j].fields.cardImg.sys.id;

            /*Con el id de la imagen, la busco en el array de Assets*/
            const cardImgData = imgArray.find((item) => {
              if (cardImgId == item.sys.id) {
                return item.fields;
              }
            });
            const cardImgAlt = cardImgData.fields.title;
            const cardImgUrl = cardImgData.fields.file.url;
            createCard(
              cardsContainerExtraEl,
              cardTitle,
              cardDescription,
              cardImgAlt,
              cardImgUrl
            );
            containerItems++;
            //Si se llenó el contenedor o no hay más items, agrego éste al contenedor de servicios
            if (containerItems == 3 || j == itemsArray.length - 1) {
              containerEl.appendChild(cardsContainerExtraEl);
              containerItems = 0;
            }
          }

          //Como hay más contenedores habilito el botón Ver Más
          showVerMasButton();
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

function showVerMasButton() {
  const verMasButtonEl = document.querySelector(".ver-mas-btn");
  verMasButtonEl.style.display = "flex";
  const verMenosButtonEl = document.querySelector(".ver-menos-btn");
  const serviciosSectionEl = document.querySelector(".servicios-section");
  const cardsContainersEls = document.querySelector(".cards__container-extra");

  verMasButtonEl.addEventListener("click", () => {
    verMasButtonEl.style.display = "none";
    verMenosButtonEl.style.display = "flex";
    serviciosSectionEl.classList.toggle("expanded");
    cardsContainersEls.style.display = "flex";
  });

  verMenosButtonEl.addEventListener("click", () => {
    verMenosButtonEl.style.display = "none";
    verMasButtonEl.style.display = "flex";
    serviciosSectionEl.classList.toggle("expanded");
    cardsContainersEls.style.display = "none";
  });
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
  const containerEl = document.querySelector(".servicios__container");
  content_model = "serviciosCards";
  loadCardsContainer(
    containerEl,
    space_id,
    environment_id,
    content_model,
    access_token
  );

  //Cargo el footer
  loadFooter();
}
main();
