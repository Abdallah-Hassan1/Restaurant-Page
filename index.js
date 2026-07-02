import { getLocal, saveLocal, CURRENCY } from "./utils.mjs";
// index.html
let footer = document.querySelector("footer");
footer.innerText = `© ${new Date().getUTCFullYear()} البركة. جميع الحقوق محفوظة!`;

const categories = ["المقبلات", "المشويات", "المشروبات", "الحلويات"];
let menuItems = [
  {
    id: 1,
    image: { src: "pigeon.jpg", alt: "حمام مشوي" },
    title: "حمام",
    description: "حمام محشي (أرز أو فريك)",
    price: 120,
    category: categories[1] || "",
  },
  {
    id: 2,
    image: { src: "cake.jpeg", alt: "كيك" },
    title: "كيك",
    description: "كيك بالتوت 4 طبقات",
    price: 50,
    category: categories[3] || "",
  },
];

function checkAndCreateCards(menuItems) {
  let cards = document.createElement("div");
  cards.setAttribute("class", "cards");

  if (menuItems.length) {
    menuItems.forEach((item) => {
      cards.appendChild(createCard(item));
    });
  } else {
    // If there is no item
    let div = document.createElement("div");
    div.setAttribute("class", "not-exists");
    div.innerText = "لا يوجد أطباق";
    cards.appendChild(div);
  }
  return cards;
}

function createCard(menuItem) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let front = document.createElement("div");
  front.setAttribute("class", "face front");
  let image = document.createElement("img");
  image.setAttribute("src", menuItem.image.src);
  image.setAttribute("alt", menuItem.image.alt);
  image.addEventListener(
    "mouseenter",
    () => {
      image.classList.add("stopped");
    },
    { once: true },
  );
  front.appendChild(image);

  let back = document.createElement("div");
  back.setAttribute("class", "face back");
  let text = document.createElement("div");
  text.setAttribute("class", "text");
  let div = document.createElement("div");
  div.setAttribute("class", "title");
  div.innerText = menuItem.title;
  text.appendChild(div);
  div = document.createElement("div");
  div.setAttribute("class", "description");
  div.innerText = menuItem.description;
  text.appendChild(div);
  div = document.createElement("div");
  div.setAttribute("class", "price");
  div.innerText = `${menuItem.price} ${CURRENCY}`;
  text.appendChild(div);
  back.appendChild(text);
  let button = document.createElement("button");
  button.innerHTML = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
  `;
  div = document.createElement("div");
  div.innerText = "+1";
  button.appendChild(div);
  back.appendChild(button);

  button.addEventListener("click", function () {
    div.classList.add("add");
    setTimeout(() => {
      div.classList.remove("add");
    }, 500);

    if (getLocal("cart") && getLocal("cart").length) {
      let prev = getLocal("cart");
      let index;
      for (index = 0; index < prev.length; index++) {
        if (prev[index].id == menuItem.id) {
          menuItem.count = prev[index].count + 1;
          break;
        }
      }
      if (index == prev.length) {
        menuItem.count = 1;
        prev.push(menuItem);
      } else prev[index] = menuItem;

      saveLocal("cart", prev);
    } else {
      menuItem.count = 1;
      saveLocal("cart", [menuItem]);
    }
    document.querySelector("header a .content span").innerText =
      getLocal("cart").length;
  });

  card.appendChild(front);
  card.appendChild(back);

  return card;
}

function categoryClick(category) {
  document
    .querySelector("section.menu .categories .active")
    .classList.replace("active", "category");
  category.setAttribute("class", "active");

  const menuItemsReduced = menuItems.filter(
    (item) =>
      category.innerText == item.category || category.innerText == "الكل",
  );

  let menu = document.querySelector("section.menu");
  menu.removeChild(document.querySelector("section.menu .cards"));

  menu.appendChild(checkAndCreateCards(menuItemsReduced));

  return menuItemsReduced;
}

function createMenu() {
  let menu = document.querySelector("section.menu");
  let div = document.createElement("div");
  div.setAttribute("class", "categories");
  let category = document.createElement("div");
  category.setAttribute("class", "active");
  category.innerText = "الكل";
  category.addEventListener("click", function () {
    categoryClick(category);
  });
  div.appendChild(category);

  categories.forEach((item) => {
    const category = document.createElement("div");
    category.setAttribute("class", "category");
    category.innerText = item;
    category.addEventListener("click", function () {
      categoryClick(category);
    });
    div.appendChild(category);
  });

  menu.appendChild(div);

  menu.appendChild(checkAndCreateCards(menuItems));
}
createMenu();

document.querySelector("header a .content span").innerText =
  getLocal("cart")?.length || 0;

let topBtn = document.querySelector("#top");
window.onscroll = () => {
  if (window.scrollY > 300) {
    topBtn.style.visibility = "visible";
  } else {
    topBtn.style.visibility = "hidden";
  }
};

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Create Lucide Icons
document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
});
