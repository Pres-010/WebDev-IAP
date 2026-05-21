console.log("Hello World!");
let navBar = document.querySelector("aside")
let MenuIcon = document.getElementById('menu-sharp')
MenuIcon.addEventListener('click', function show() {
    navBar.style.display = 'block'
    MenuIcon.style.display = 'none'
})