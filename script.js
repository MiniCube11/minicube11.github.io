var linksOpen = false;
var navMobile = document.getElementsByClassName("nav-mobile")[0];
var navLinks = navMobile.getElementsByTagName("a");

function toggleMobileLinks() {
    navMobile.classList.toggle("close");
    navMobile.classList.toggle("open");
}

for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = function() {
        navMobile.classList.add("close");
        navMobile.classList.remove("open");
    }
}