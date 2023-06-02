const product_search = document.querySelector(".product_search");
const body_shop = document.querySelector(".body_shop");
const productsContainer = document.querySelector(".productsContainer");
const button_product_item = document.querySelector(".button_product_item");
const themeButton = document.querySelector(".theme-button");
const loader = document.querySelector("#loader");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const modalBackground = document.querySelector(".modalBackground");
const faWindowClose = document.querySelector(".fa-window-close");
const modalActive = document.querySelector(".modalActive");
const modalWindow = document.querySelector(".modalWindow");
const modalTrigger = document.getElementById("trigger");
const windowInnerWidth = document.documentElement.clientWidth;
const scrollbarWidth = parseInt(window.innerWidth) - parseInt(windowInnerWidth);
const allBoxes = document.querySelectorAll(".icons");
const checkout = document.getElementById("checkout");
const clear_cart = document.getElementById("clear_cart");
const totalPrice = document.querySelector(".total_price");

let products_items = [];
let currentProducts = [];

const numberPerPage = 30;
let pageNumber = 1;
let numberOfPages = 40;

const productFromLocalStorage = JSON.parse(
  window.localStorage.getItem("products")
);
let allproducts = [];

if (productFromLocalStorage && productFromLocalStorage.length > 0) {
  allproducts = productFromLocalStorage;
}

const displayLoading = () => {
  loader.style.display = "block";
};

const hideLoading = () => {
  loader.style.display = "none";
};

const clear = () => {
  document.getElementById("n1").value = "";
};

const renderDisplayProducts = (item) => {
  const icons = document.createElement("div");
  icons.className = "icons";
  icons.innerHTML = `<span class="image"><img src="${
    item.images[0] || "-"
  }"></span>
  <div class="div_price"><p>Price:</p><span class="price">${
    item.price || "-"
  } $</span></div>
  <div class="div_description"><p>Description:</p><span class="description">${
    item.description || "-"
  }</span></div>
  <div class="div_category_name"><p>Title:</p><span class="category_name">${
    item.title
  }</span></div>
  <div class="div_add_to_card"><button class="add_to_card_button" data-id=${
    item.id
  }>To Basket</button></div>
  `;
  productsContainer.appendChild(icons);
};

const getProducts = () => {
  displayLoading();
  fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${pageNumber}&limit=${numberPerPage}`
  )
    .then((response) => response.json())
    .then((data) => {
      products_items = data;
      currentProducts = data;
      products_items.map((item) => {
        hideLoading();
        renderDisplayProducts(item);
      });
      localStorage.setItem("products", JSON.stringify(data));
      const allBoxes = document.querySelectorAll(".icons");
      [...allBoxes].map((box) => {
        box
          .querySelector(".add_to_card_button")
          .addEventListener("click", addToCart);
      });
      const badge = document.querySelector(".badge");
      badge.setAttribute("value", totalCountInBasket);
    })
    .catch((err) => alert("Something broke, try again later!!!"));
};

getProducts();

const bodyMargin = () => {
  body_shop.style.marginRight = "-" + scrollbarWidth + "px";
};
bodyMargin();

const cartFromLocalStorage =
  JSON.parse(window.localStorage.getItem("cart")) || [];

const totalCountInBasket = cartFromLocalStorage.reduce(
  (total, currentItem) => total + currentItem.qty,
  0
);

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

const filterByTitle = (value, title) => {
  console.log('value', value);
  console.log('title', title);
  const actualProductFromLocalStorageOnPage = JSON.parse(
    window.localStorage.getItem("products")
  );
  console.log('actualProductFromLocalStorageOnPage', actualProductFromLocalStorageOnPage);
  if (!value) {
    alert(`Please enter ${title} of product !?`);
  } else {
    currentProducts = actualProductFromLocalStorageOnPage.filter((item) => {
      if (item[title].toLowerCase().includes(value.toLowerCase()))
      {
        return value;
      }
    });
    if (currentProducts.length === 0) {
      productsContainer.classList.add("no_found");
      productsContainer.innerHTML = "No matches found";
    } else {
      productsContainer.innerHTML = "";
      currentProducts.map((item) => {
        displayLoading();
        renderDisplayProducts(item);
        hideLoading();
      });
    }
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

themeButton.onclick = () => {
  body_shop.classList.toggle("dark-theme");
};

button_product_item.addEventListener("click", (e) => {
  e.preventDefault();
  filterByTitle(product_search.value, "title");
  clear();
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber > 1) {
    pageNumber--;
    getProducts(pageNumber);
  }
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  if (pageNumber < numberOfPages) {
    pageNumber++;
    getProducts(pageNumber);
  }
});

modalTrigger.addEventListener("click", modalShow);

faWindowClose.addEventListener("click", closeModal);