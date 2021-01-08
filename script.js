let toggleNav = () => {
    let burger = document.querySelector('.burger');
    let nav = document.querySelector('.nav-links');
    let navLinks = document.querySelectorAll('.nav-links li');

    nav.classList.toggle('nav-active');
    burger.classList.toggle("close");

    let w = window.innerWidth;
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = ""
        } else {
            if (w <= 688) {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            } else {
                link.style.animation = `navLinkFade`;
            }
        }
    });
    console.log(w);    
}

let navSlide = () => {
    let burger = document.querySelector('.burger');  

    burger.addEventListener('click', () => {
        toggleNav();
    });

    
}

let navClick = () => {
    let navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
        toggleNav();
        });
    });
}

// let navLinks = document.querySelectorAll(".nav-link");
//     navLinks.forEach( 
//     function(navLink) { 
//         navLink.addEventListener("click", navSlide());
//     });

let w = window.innerWidth;
if (w <= 688) {
    navSlide();
    navClick();
}
console.log(w);
