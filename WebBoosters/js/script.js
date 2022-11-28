// Данный JS реализует:
// - отрисовку товаров из базы данных
// - задание обработчов событий для открытия и закртытия формы отправки POPUP 

'use strict';

document.addEventListener("DOMContentLoaded", function() {

  /* ПЕРЕМЕННЫЕ после загрузки страницы */
  let body = document.querySelector("body");
  let container = document.querySelector(".container");


  /* -----> Отрисовываем товары из базы данных -----> */

  function appendProd (obj, container) {
    //находим прототип карточки товара и клонируем его в CARD
    let card = document.querySelector("[name=p_card_proto]").cloneNode(true);
    card.setAttribute('name', 'p_card');

    //устанавливаем изображение, стоимость, имя и описание если они есть
    let img = card.querySelector(".prod_card_img");
    if(obj.imgUrl) {
      img.style.display = "block";
      img.src = obj.imgUrl;
    }
    else {img.style.display = "none";};

    let price = card.querySelector(".prod_card_price");
    if(obj.price) {price.innerHTML = obj.price + " руб.";}
    else {price.innerHTML = "Стоимость пока не установлена"};

    let popupLink = card.querySelector(".popup_link");
    let name = card.querySelector(".prod_card_name");
    if(obj.name && obj.cupCountry && obj.year) {
      name.innerHTML = `${obj.name} (${obj.cupCountry}, ${obj.year})`;
      popupLink.dataset.message = obj.name
    }
    else if(obj.name) {
      name.innerHTML = obj.name;
      popupLink.dataset.message = obj.name;
    }
    else {name.innerHTML = "Имя уточняется"};

    let dscr = card.querySelector(".prod_card_dscr");
    if(obj.dscr) {
      dscr.dataset.text = obj.dscr
      if (obj.dscr.length > 20) {
        dscr.innerHTML = obj.dscr.slice(0, 35) + "..."
      } else {
        dscr.innerHTML = obj.dscr
      }
    }
    else {dscr.innerHTML = "Нет описания"};

    container.append(card); //добавляем элемент в контейнер
  }

  for (let prod of products) {
    appendProd(prod, container);
  }


  if(products) { // Скрываем прототип карточек товаров. Если товаров нет, то показать прототип.
    document.querySelector("[name=p_card_proto]").style.display = "none"
  }
  /* <----- Отрисовываем товары из базы данных <----- */

  /* -----> Создаём обработчики событий -----> */

  //добавляем обработчик открытитя модального окна при нажати на кнопку c ".popupLinks"
  let popupLinks = document.querySelectorAll(".popup_link");
  if(popupLinks.length > 0) {
    for (let elem of popupLinks) {

      elem.addEventListener ("click", function(e) {
        let popupName = elem.dataset.link;
        let popupMessage = elem.dataset.message;
        let curentPopup = document.querySelector(`${popupName}`);
        popupOpen(curentPopup, popupMessage);
        e.preventDefault();
      })
    }
  };

  function popupOpen (elem, message) {
    if(elem) {
      let popupActive = document.querySelector(".popup.open");
      let popupProd = document.querySelector("[name='prod']")
      if (popupActive) {
        popupClose(popupActive)
      }
      elem.classList.add("open");
      popupProd.value = message;
      popupProd.dispatchEvent(new Event('input', {bubbles:true}));

      elem.addEventListener("click", function(e) {
        if(!e.target.closest(".popup__content")){
          popupClose(e.target.closest(".popup"));
        }
      })
    }
  }

  //добавляем обработчик для всех кнопок закртыия
  let popupCloseIcons = document.querySelectorAll(".popup__close")
  if (popupCloseIcons.length > 0) {
    for (let elem of popupCloseIcons) {
      elem.addEventListener("click", function(e) {
        popupClose(elem.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupClose (elem) {
    if(elem) {
      elem.classList.remove("open");
    }
  }

  /* <----- Создаём обработчики событий <----- */

});