var elem = document.querySelector("header");
var scrollTrigger = 230;
window.onscroll = ScrollHandlerForHeader;
function ScrollHandlerForHeader() {
    if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        elem.classList.remove("pad-2");
          }
          else{
         elem.classList.add("pad-2");
    }
}
function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

