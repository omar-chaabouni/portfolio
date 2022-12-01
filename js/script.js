const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 100);
});

let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

if (menu != null)
  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navlist.classList.toggle("open");
  };

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
};

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 72,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".navlist a[href*=" + sectionId + "]"
      );
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active");
    } else {
      sectionsClass.classList.remove("active");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 100,
});

sr.reveal(`.home`, {
  delay: 0,
  origin: "left",
});

sr.reveal(`.row`, {
  origin: "left",
});

sr.reveal(`.about-img, .contact-text`, {
  origin: "left",
});

sr.reveal(`.about-text, .contact-form`, {
  origin: "left",
});

sr.reveal(`.backend-box`, {
  origin: "left",
  duration: 1500,
});
sr.reveal(`.frontend-box`, {
  origin: "left",
  delay: 300,
  duration: 1500,
});
sr.reveal(`.indus-box`, {
  origin: "left",
  delay: 500,
  duration: 1500,
});


const contactForm = document.querySelector(".contact-form");
const contactName = document.querySelector("#contact-name");
const contactEmail = document.querySelector("#contact-email");
const contactPhone = document.querySelector("#contact-phone");
const contactMsg = document.querySelector("#contact-msg");
const submitMsg = document.querySelector(".submit-msg");

async function sendEmail(e) {
  e.preventDefault();
  submitMsg.innerText = "Sending..";
  const name = contactName.value;
  const email = contactEmail.value;
  const phone = contactPhone.value;
  const msg = contactMsg.value;
  try {
    await postData(
      "https://webhook.site/452de957-cf32-4882-a131-fb08d7d15da2",
      {
        type: "Msg for my website",
        name,
        email,
        phone,
        msg,
      }
    );
    submitMsg.classList.add("submit-msg--success");
    submitMsg.innerText = "Message Sent Successfully";
    contactName.value = "";
    contactEmail.value = "";
    contactPhone.value = "";
    contactMsg.value = "";
    setTimeout(removeSubmitMsg, 5000);
  } catch (error) {
    submitMsg.classList.add("submit-msg--error");
    submitMsg.innerText = "An Error Has Occurred!";
    setTimeout(removeSubmitMsg, 5000);
  }
}

function removeSubmitMsg() {
  submitMsg.innerText = "";
  submitMsg.classList = ["submit-msg"];
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "no-cors", // no-cors, *cors, same-origin

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

contactForm.addEventListener("submit", sendEmail);
