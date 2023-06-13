

var elem = document.querySelector("header");
var scrollTrigger = 200;
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


let cartProducts = [];
  if (JSON.parse(localStorage.getItem("cartProducts")) != undefined) {
      cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  }
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
          getProductsCount(cartProducts);
          
  function getProductsCount(arr) {
    let cnt = 0;
    for (const eachItem of arr) {
        cnt += eachItem.count;
        document.querySelector(".count-card").innerText = cnt;
    }
}
let wishlisted = [];
 

  if (JSON.parse(localStorage.getItem("wishlisted")) != null) {
      wishlisted = JSON.parse(localStorage.getItem("wishlisted"));
  }
  localStorage.setItem("wishlisted", JSON.stringify(wishlisted));
  getWishlistCount(wishlisted);

  function getWishlistCount(arr) {
      let cnt = 0;
      for (const eachItem of arr) {
          cnt += eachItem.count;
          document.querySelector(".wishlist-sup").innerText = cnt;
      }
  }
