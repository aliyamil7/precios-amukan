let cart = [];

function formatPrice(num) {
  return `$${num.toLocaleString("es-AR")}`;
}

function renderCart() {
  const itemsContainer = document.querySelector(".cart-items");
  itemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.textContent = `${item.name} - ${formatPrice(item.price)}`;

    itemsContainer.appendChild(li);

    setTimeout(() => li.classList.add("show"), 10);
  });

  updateTotal();
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
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
}

main();
