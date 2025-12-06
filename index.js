document.querySelectorAll(".price-item-title").forEach((title) => {
  title.addEventListener("click", () => {
    const sublist = title.nextElementSibling;
    sublist?.classList.toggle("active");
    title.classList.toggle("open");
  });
});
