let menuBtn = document.querySelector(".menu")
let MenuLinks = document.querySelector(".menu-links")
menuBtn.addEventListener("click", () => {
    MenuLinks.classList.toggle("shown")
})