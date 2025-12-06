let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(num) {
  return `$${num.toLocaleString("es-AR")}`;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const itemsContainer = document.querySelector(".cart-items");
  itemsContainer.innerHTML = "";

  const counter = document.querySelector(".cart-counter");
  counter.textContent = cart.length;

  counter.classList.add("bump");
  setTimeout(() => counter.classList.remove("bump"), 200);

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<li class="empty-msg">Tu carrito está vacío</li>`;
  } else {
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.classList.add("cart-item");

      li.innerHTML = `
        ${item.name} - ${formatPrice(item.price)}
        <span class="delete">&times;</span>
      `;

      li.querySelector(".delete").addEventListener("click", (e) => {
        e.stopPropagation();
        removeItem(index);
      });

      itemsContainer.appendChild(li);

      setTimeout(() => li.classList.add("show"), 10);
    });
  }

  updateTotal();
  saveCart();
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function removeItem(index) {
  const removedItem = document.querySelectorAll(".cart-item")[index];
  removedItem.classList.add("hide");

  setTimeout(() => {
    cart.splice(index, 1);
    renderCart();
  }, 300);
}

function clearCart() {
  cart = [];
  renderCart();
}

function updateTotal() {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  document.querySelector(".total-amount").textContent = formatPrice(total);
}

function main() {
  const titles = document.querySelectorAll(".price-item-title");
  const buttons = document.querySelectorAll(".add-btn");
  const clearButton = document.querySelector(".clear-btn");

  titles.forEach((title) => {
    title.addEventListener("click", () => {
      const sublist = title.nextElementSibling;
      sublist.style.display =
        sublist.style.display === "block" ? "none" : "block";
    });
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.parentElement;
      const name = li.childNodes[0].textContent.trim();
      const price = Number(
        li
          .querySelector(".price-value")
          .textContent.replace("$", "")
          .replace(/\./g, "")
      );

      addToCart(name, price);

      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 300);
    });
  });

  clearButton.addEventListener("click", clearCart);

  renderCart();
}

main();
