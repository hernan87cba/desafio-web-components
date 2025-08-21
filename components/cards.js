function createCard(
  cardsContainerEl,
  cardTitle,
  cardDescription,
  cardImgAlt,
  cardImgUrl
) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.innerHTML = `
      <img
      class="card__img"
      src="${cardImgUrl}" 
      alt="${cardImgAlt}"
      />      
      <div class="card__title-div">
      <h3 class="card__title poppins-bold">${cardTitle}</h3>
      </div>
      <div class="card__description-div">
      <p class="card__description poppins-regular">${cardDescription}
      </p>
      </div>`;
  cardsContainerEl.appendChild(cardEl);
}
