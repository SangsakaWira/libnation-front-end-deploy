const navMobile = document.querySelector(".nav-mobile")
const navMenu = document.querySelector(".nav-menu")
const body = document.body

navMobile.addEventListener("click", () => {
    navMobile.classList.toggle("active")
    navMenu.classList.toggle("active")
    
    // if (navMenu.classList.contains('active')) {
    //     body.style.overflowY = 'hidden'
    // } else {
    //     body.style.overflowY = 'unset'
    // }
})


// const navMenuItems = navMenu.getElementsByClassName("nav-item")

// for (let i = 0; i < navMenuItems.length; i++) {
//     navMenuItems[i].addEventListener("click", function() {
//         const current = document.getElementsByClassName("active")
//     })
// }