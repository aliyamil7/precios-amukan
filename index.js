const titles = document.querySelectorAll(".price-item-title");

titles.forEach((title) => {
  title.addEventListener("click", () => {
    const sublist = title.nextElementSibling;
    sublist.style.display =
      sublist.style.display === "block" ? "none" : "block";
  });
});
