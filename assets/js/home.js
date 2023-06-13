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
  
  
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("category-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  let addCartBtns = document.querySelectorAll(".basket-btn");
  let cartProducts = [];
  if (JSON.parse(localStorage.getItem("cartProducts")) != undefined) {
      cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
  }

  addCartBtns.forEach(addCart => {
      getProductsCount(cartProducts);
      addCart.addEventListener("click", function (e) {
          e.preventDefault();
      let itemImg = this.parentNode.parentNode.parentNode.children[0].children[0].getAttribute("src");

          console.log(itemImg);
          let itemName = this.parentNode.parentNode.parentNode.children[1].children[0].innerText
          let itemPrice = this.parentNode.parentNode.parentNode.children[1].children[1].innerText
          let itemID = parseInt(this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
          let existProduct = cartProducts.find(m => m.id == itemID);
   

          if (existProduct != undefined) {
              existProduct.count += 1;
          } else {
              cartProducts.push({
                  id: itemID,
                  image: itemImg,
                  name: itemName,
                  price: itemPrice,
                  count: 1
              })
          }
          localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
          getProductsCount(cartProducts);
      })
  });

  function getProductsCount(arr) {
      let cnt = 0;
      for (const eachItem of arr) {
          cnt += eachItem.count;
          document.querySelector(".count-card").innerText = cnt;
      }
  }


  let addWishlistBtns = document.querySelectorAll(".heart");
  let wishlisted = [];
 

  if (JSON.parse(localStorage.getItem("wishlisted")) != null) {
      wishlisted = JSON.parse(localStorage.getItem("wishlisted"));
  }

  addWishlistBtns.forEach(addWishlist => {
      getWishlistCount(wishlisted);

      let checkedID = addWishlist.parentNode.parentNode.getAttribute("data-id");
      console.log(checkedID);
      let productInfo = wishlisted.find(m => m.id == checkedID);
      if (productInfo != undefined) {
          addWishlist.classList.remove("fa-regular");
          addWishlist.classList.remove("open-hovered");
          addWishlist.classList.add("fa-solid");
      }

      addWishlist.addEventListener("click", function (e) {
          e.preventDefault();
          let productImg = this.parentNode.parentNode.parentNode.children[0].children[0].getAttribute("src");

         
          let productName = this.parentNode.parentNode.parentNode.children[1].children[0].innerText
          let productPrice = this.parentNode.parentNode.parentNode.children[1].children[1].innerText
          let productID = parseInt(this.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
          let checkProduct = wishlisted.find(m => m.id == productID);
         
          if (checkProduct != undefined) {
              this.classList.add("fa-regular");
              this.classList.add("open-hovered");
              this.classList.remove("fa-solid");
              let unlistedIndex = wishlisted.indexOf(checkProduct);
              if (unlistedIndex > -1) {
                  wishlisted.splice(unlistedIndex, 1);
              }

              alertMessage.firstElementChild.innerText = "Product deleted from Wishlist";
              localStorage.setItem("wishlisted", JSON.stringify(wishlisted));
              let decreasedSup = parseInt(document.querySelector(".wishlist-sup").innerText) - 1;
              document.querySelector(".wishlist-sup").innerText = decreasedSup;
          } else {
              this.classList.remove("fa-regular");
              this.classList.remove("open-hovered");
              this.classList.add("fa-solid");
              wishlisted.push({
                  id: productID,
                  image: productImg,
                  name: productName,
                  price: productPrice,
                  count: 1
              });
          }
          localStorage.setItem("wishlisted", JSON.stringify(wishlisted));
          getWishlistCount(wishlisted);
      });
  });


  function getWishlistCount(arr) {
      let cnt = 0;
      for (const eachItem of arr) {
          cnt += eachItem.count;
          document.querySelector(".wishlist-sup").innerText = cnt;
      }
  }
