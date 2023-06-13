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


  filterSelection("all")
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
  }
  
  function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
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
