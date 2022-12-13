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

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessage({
    fullName: fullName.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
  });
});

const sendMessage = (arg) => {
  const formData = new FormData();
  formData.append("name", arg.fullName);
  formData.append("email", arg.email);
  formData.append("subject", arg.subject);
  formData.append("content", arg.message);

  const config = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  fetch("https://ajo.myfaysal.com/api/email/send", config)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === true) {
        fullName.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
      }
    })
    .catch((error) => console.log("error", error));
};
