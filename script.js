const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  const target = link.getAttribute("href");
  if (target === currentPage) {
    link.classList.add("is-active");
  }
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const filterButtons = document.querySelectorAll(".filter-chip");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((chip) => chip.classList.remove("is-active"));
      button.classList.add("is-active");

      projectCards.forEach((card) => {
        const matches =
          selected === "all" || card.dataset.category.split(" ").includes(selected);
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });
}
