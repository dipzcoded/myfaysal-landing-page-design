const menuBtn = document.querySelector(".menu");
const cancelBtn = document.querySelector(".cancel-menu");
const mainNav = document.querySelector(".header");
const navList = document.querySelector(".nav");
let listItems = document.querySelectorAll(".nav-items");
const getAppBtn = document.querySelector("header.header nav.nav a.btn");

listItems = [...listItems, getAppBtn];
const toggleMenu = () => {
  navList.classList.toggle("show");

  listItems.forEach((el, index) => {
    if (!el.style.animation) {
      el.style.animation = `slideX 0.5s ease forwards ${index / 7 + 1}s `;
    } else {
      el.style.animation = "";
    }
    menuBtn.classList.toggle("notShowMenu");
    cancelBtn.classList.toggle("notShowMenu");
  });
};

const arrayBtn = [menuBtn, cancelBtn];
const windowEvent = ["scroll", "resize"];
arrayBtn.forEach((el) => el.addEventListener("click", toggleMenu));

listItems.forEach((el) => {
  el.addEventListener("click", () => {
    if (Number(window.innerWidth) < 800) {
      toggleMenu();
    }
  });
});

windowEvent.forEach((winEvt) => {
  // scrolling
  window.addEventListener(winEvt, () => {
    mainNav.classList.toggle("sticky", window.scrollY > 0);
  });

  // resize
  window.addEventListener(winEvt, (e) => {
    if (Number(e.target.innerWidth) > 800) {
      if (navList.classList.contains("show")) {
        navList.classList.remove("show");
        // menuBtn.classList.toggle("notShowMenu");
        // cancelBtn.classList.toggle("notShowMenu");
        listItems.forEach((el, index) => {
          if (!el.style.animation) {
            el.style.animation = `slideX 0.5s ease forwards ${index / 7 + 1}s `;
          } else {
            el.style.animation = "";
          }
          menuBtn.classList.toggle("notShowMenu");
          cancelBtn.classList.toggle("notShowMenu");
        });

        // menu.style.display = "none";
      }
    }
  });
});
