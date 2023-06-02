const aboutContainer = document.querySelector(".about_container");
const totalPrice = document.querySelector(".total_price");
const modalTrigger = document.getElementById("trigger");
const faWindowClose = document.querySelector(".fa-window-close");
const modalBackground = document.querySelector(".modalBackground");
const windowInnerWidth = document.documentElement.clientWidth;
const body_shop = document.querySelector(".body_shop");
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);
const modalActive = document.querySelector(".modalActive");
const modalWindow = document.querySelector(".modalWindow");


const bodyMargin = () => {
  body_shop.style.marginRight = "-" + scrollbarWidth + "px";
};
bodyMargin();

const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
};

const getJoke = () => {
  displayLoading();
  fetch(`https://official-joke-api.appspot.com/random_ten`)
    .then(response => response.json())
    .then(data => {
      dataJoke = data;
      hideLoading();
      dataJoke.map(item => {
        console.log("dataJoke", dataJoke);
        const divInform = document.createElement("div");
        divInform.className = "div_inform";
        divInform.innerHTML = `
            <span class="question">${item.setup}</span>
            <span class="answer">${item.punchline}</span>
            `;
        aboutContainer.appendChild(divInform);
      });
    })
    .catch(err => alert("NO MORE JOKE!!!"));
};

getJoke();

const cartFromLocalStorage =
    JSON.parse(window.localStorage.getItem("cart")) || [];

const totalCountInBasket = cartFromLocalStorage.reduce(
    (total, currentItem) => total + currentItem.qty,
    0
);

const badge = document.querySelector(".badge");
badge.setAttribute("value", totalCountInBasket);


const showCountProductInBasket = () => {
  const currentCartFromLocalStorage =
    JSON.parse(window.localStorage.getItem("cart")) || [];
  let totalCountInBasket = currentCartFromLocalStorage.reduce(
    (total, currentItem) => total + currentItem.qty,
    0
  );
  const badge = document.querySelector(".badge");
  const currentTotalPrice = currentCartFromLocalStorage.reduce(
    (totalPrice, currentItem) =>
      totalPrice + currentItem.price * currentItem.qty,
    0
  );
  const updatedItemTotalPrice = document.querySelector(".item_total_price");
  updatedItemTotalPrice.innerHTML = currentTotalPrice + "&nbsp; $";
  badge.setAttribute("value", totalCountInBasket);
  renderModalProductsInBasket(currentCartFromLocalStorage);
};

const showTotalPrice = cartFromLocalStorage.reduce(
  (totalPrice, currentItem) => totalPrice + currentItem.price * currentItem.qty,
  0
);

const showCountTotalPrice = () => {
  const itemTotalPrice = document.createElement("span");
  itemTotalPrice.className = "item_total_price";
  itemTotalPrice.innerHTML = showTotalPrice + "&nbsp; $";
  totalPrice.appendChild(itemTotalPrice);
};

showCountTotalPrice();

const emptyBasket = () => {
  const basketItem = document.createElement("div");
  const actualProductFromLocalStorage = JSON.parse(
    window.localStorage.getItem("cart")
  );
  if (!actualProductFromLocalStorage) {
    basketItem.innerHTML = `<p class='no_product'>The cart is empty! Please select product!!!</p> `;
    modalWindow.appendChild(basketItem);
  }
};

const renderModalProductsInBasket = (cartFromLocalStorage) => {
  modalWindow.innerHTML = "";
  cartFromLocalStorage?.length > 0 &&
    cartFromLocalStorage.map((item) => {
      const basketItem = document.createElement("div");
      basketItem.className = "basketItem";
      basketItem.innerHTML = `
    <div class ="div_image_cart">
    <img class="img_cart" src="${item.images[0] || "-"}">
    </div>
    <div class="wrapper_basket">
    <div class ="div_title_cart">
    <p class ="title_cart">Title:</p><p class="item_title">${
      item.title
    }</p></div>
    <div class ="div_title_price">
    <p class = "title_price">Price:</p><span class="item_price">${
      item.price || "-"
    } $</span>
    </div>
    <div class ="div_title_qty">
    <p class ="title_qty">Quantity:</p><span class="item_quantity">${
      item.qty || "-"
    }</span>
    </div>
    </div>
    `;
      modalWindow.appendChild(basketItem);
    });
};

const getProductById = (id) => {
  return productFromLocalStorage.find((productItem) => id === productItem.id);
};

const addToCart = (e) => {
  const productToAdd = getProductById(Number(e.target.dataset.id));
  const cartFromLocalStorage =
    JSON.parse(window.localStorage.getItem("cart")) || [];
  const cartContainsProduct = cartFromLocalStorage.some(
    (item) => item.id === productToAdd.id
  );
  localStorage.setItem(
    "cart",
    JSON.stringify(
      cartContainsProduct
        ? cartFromLocalStorage.map((item) => {
            if (item.id === productToAdd.id) {
              item.qty += 1;
            }
            return item;
          })
        : [...cartFromLocalStorage, { ...productToAdd, qty: 1 }]
    )
  );
  showCountProductInBasket();
};

const modalShow = () => {
  modalBackground.style.display = "block";
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }
  modalActive.style.left = "calc(-50% - " + (255 - scrollbarWidth / 2) + "px)";
  emptyBasket();
  const actualProductFromLocalStorage = JSON.parse(
    window.localStorage.getItem("cart")
  );
  renderModalProductsInBasket(actualProductFromLocalStorage);
};

const closeModal = () => {
  modalWindow.innerHTML = "";
  modalBackground.style.display = "none";
  if (windowInnerWidth >= 1366) {
    bodyMargin();
  }
};

clear_cart.addEventListener("click", function (e) {
  e.preventDefault;
  totalPrice.innerHTML = "";
  const itemTotalPrice = document.createElement("span");
  itemTotalPrice.className = "item_total_price";
  itemTotalPrice.innerHTML = "Total: &nbsp; 0 &nbsp; $";
  totalPrice.appendChild(itemTotalPrice);
  modalWindow.innerHTML = "";
  localStorage.clear();
  modalWindow.innerHTML = `<p class='no_product'>The cart is empty!</p> `;
  const badge = document.querySelector(".badge");
  badge.setAttribute("value", "0");
});


modalTrigger.addEventListener("click", modalShow);

faWindowClose.addEventListener("click", closeModal);