// ==============================
// Footer Year
// ==============================
function initFooterYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ==============================
// Mobile Menu
// ==============================
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==============================
// Reveal Animation
// ==============================
function initRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal-up, .reveal-card");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 0.035, 0.22)}s`);
    observer.observe(item);
  });
}

// ==============================
// Rotating Text
// ==============================
function initRotatingText() {
  const rotatingWord = document.getElementById("rotating-word");

  if (!rotatingWord) return;

  const words = [
    "clarity",
    "structure",
    "experience",
    "communication"
  ];

  let currentIndex = 0;

  rotatingWord.textContent = words[currentIndex];

  rotatingWord.style.opacity = "1";
  rotatingWord.style.transform = "translateY(0)";
  rotatingWord.style.transition = "opacity 0.45s ease, transform 0.45s ease";

  setInterval(() => {
    rotatingWord.style.opacity = "0";
    rotatingWord.style.transform = "translateY(12px)";

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % words.length;
      rotatingWord.textContent = words[currentIndex];

      rotatingWord.style.opacity = "1";
      rotatingWord.style.transform = "translateY(0)";
    }, 450);
  }, 2400);
}

// ==============================
// Portfolio Filter
// ==============================
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  if (!filterButtons.length || !portfolioCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      portfolioCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");

        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ==============================
// Project Image Modal
// ==============================
function initProjectModal() {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTriggers = document.querySelectorAll("[data-modal-image]");
  const closeButton = document.getElementById("modalClose");

  if (!modal || !modalImage || !modalTriggers.length) return;

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const imageSrc = trigger.getAttribute("data-modal-image");

      if (!imageSrc) return;

      modalImage.src = imageSrc;
      modal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });
  });

  function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    modalImage.src = "";
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// ==============================
// Init
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initMobileMenu();
  initRevealAnimation();
  initRotatingText();
  initPortfolioFilter();
  initProjectModal();
});