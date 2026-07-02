import { getLocal, saveLocal, CURRENCY, WHATSAPP_NUMBER, message } from "./utils.mjs";
const cartItems = getLocal("cart") || [];

function calculateTotal() {
  let total = 0;

  cartItems.forEach((item) => {
    total += item.count * item.price;
  });

  return total;
}

function plus(cartItem, countElement) {
  countElement.innerText = ++cartItem.count;
  let prev = getLocal("cart");
  for (let index = 0; index < cartItems.length; index++) {
    if (prev[index].id == cartItem.id) {
      prev[index] = cartItem;
      break;
    }
  }
  saveLocal("cart", prev);
  document.querySelector(".cart .total .price").innerText =
    `${calculateTotal()} ${CURRENCY}`;
}

function clear(cartItem) {
  let prev = getLocal("cart");
  prev = prev.filter((item) => cartItem.id != item.id);
  saveLocal("cart", prev);
  location.reload();
}

function minus(cartItem, countElement) {
  countElement.innerText = --cartItem.count;

  let prev = getLocal("cart");
  if (cartItem.count == 0) {
    clear(cartItem);
    return;
  }

  for (let index = 0; index < cartItems.length; index++) {
    if (prev[index].id == cartItem.id) {
      prev[index] = cartItem;
      break;
    }
  }
  saveLocal("cart", prev);
  document.querySelector(".cart .total .price").innerText =
    `${calculateTotal()} ${CURRENCY}`;
}

function createCartItem(cartItem) {
  let item = document.createElement("div");
  item.setAttribute("class", "item");

  let base = document.createElement("div");
  base.setAttribute("class", "base");
  let image = document.createElement("img");
  image.setAttribute("src", cartItem.image.src);
  image.setAttribute("alt", cartItem.image.alt);
  base.appendChild(image);
  let info = document.createElement("div");
  info.setAttribute("class", "info");
  let p = document.createElement("p");
  p.setAttribute("class", "title");
  p.innerText = cartItem.title;
  info.appendChild(p);
  p = document.createElement("p");
  p.setAttribute("class", "price");
  p.innerText = `${cartItem.price} ${CURRENCY}`;
  info.appendChild(p);
  base.appendChild(info);

  let action = document.createElement("div");
  action.setAttribute("class", "action");
  let actionBase = document.createElement("div");
  actionBase.setAttribute("class", "base");
  let button = document.createElement("button");
  button.setAttribute("class", "plus");
  button.innerText = "+";
  let count = document.createElement("div");
  button.addEventListener("click", function () {
    plus(cartItem, count);
  });
  actionBase.appendChild(button);
  count.setAttribute("class", "count");
  count.innerText = cartItem.count;
  actionBase.appendChild(count);
  button = document.createElement("button");
  button.setAttribute("class", "minus");
  button.innerText = "-";
  button.addEventListener("click", function () {
    minus(cartItem, count);
  });
  actionBase.appendChild(button);
  action.appendChild(actionBase);
  button = document.createElement("button");
  button.setAttribute("class", "clear");
  button.innerText = "x";
  button.addEventListener("click", function () {
    clear(cartItem);
  });
  action.appendChild(button);

  item.appendChild(base);
  item.appendChild(action);

  return item;
}

function createTotalDiv() {
  let total = document.createElement("div");
  total.setAttribute("class", "total");
  let div = document.createElement("div");
  div.innerText = "الإجمالي";
  total.appendChild(div);
  div = document.createElement("div");
  div.setAttribute("class", "price");
  div.innerText = `${calculateTotal()} ${CURRENCY}`;
  total.appendChild(div);
  document.querySelector(".cart").appendChild(total);
}

function createCart() {
  if (cartItems.length) {
    cartItems.forEach((item) => {
      document.querySelector(".cart").appendChild(createCartItem(item));
      let hr = document.createElement("hr");
      document.querySelector(".cart").appendChild(hr);
    });

    createTotalDiv();
  } else {
    let div = document.createElement("div");
    div.setAttribute("class", "empty");
    div.innerText = "السلة فارغة";
    document.querySelector(".cart").appendChild(div);
  }


  // Create buttons continue shopping & order whatsapp
  let div = document.createElement("div");
  div.setAttribute("class", "btns");
  let a = document.createElement("a");
  a.setAttribute("class", "continue-shopping");
  a.setAttribute("href", "../index.html#menu");
  a.innerText = "قائمة الطعام";
  div.appendChild(a);
  a = document.createElement("a");
  a.innerText = "طلب واتساب";
  a.setAttribute("target", "_blank");

  if (cartItems.length) {
    a.setAttribute("class", "order-whats");
    a.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${message(cartItems)}`);
    
  } else {
    a.setAttribute("class", "order-whats disabled");
    a.removeAttribute("href");
  }

  div.appendChild(a);
  document.querySelector(".cart").appendChild(div);
}

createCart();
