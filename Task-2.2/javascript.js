const app = () => {
  const list = document.querySelectorAll(".list");
  const cards = document.querySelectorAll(".card");

  const filter = (category, items) => {
    items.forEach((item) => {
      const isItemFiltered = item.dataset.category === category;
      const isShowAll = category.toLowerCase() === "all";
      if (!isItemFiltered && !isShowAll) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    });
  };

  list.forEach((listItem) => {
    listItem.addEventListener("click", () => {
      const currentCategory = listItem.dataset.filter;
      filter(currentCategory, cards);
    });
  });
};

app();
