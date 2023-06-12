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

$(function () {
   
 

    //Adding Cart Part
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    let tableBody = document.querySelector("tbody");
    let input = document.querySelectorAll("input")
    let subtotal = document.querySelector(".subtotal p")
    let totalPrice = document.querySelector(".total p");
    let cartPart = document.querySelector("#cart-part")
    let productTable = document.querySelector("#product-table")

    if (cartProducts.length == 0) {
        productTable.classList.add("d-none")
        cartPart.classList.remove("d-none")
    } else {
        productTable.classList.remove("d-none")
        cartPart.classList.add("d-none")
        getProductsCount(cartProducts);
        cartProducts.forEach(eachProduct => {
            console.log(tableBody);
            tableBody.innerHTML += `<tr data-id="${eachProduct.id}">
        <td class="image"><img src="${eachProduct.image}" alt=""></td>
        <td class="name">${eachProduct.name}</td>
        <td class="oneprice">$${parseFloat(eachProduct.price.substring(1))}</td>
        <td class="quantity">
            <i class="fa-solid fa-minus minus"></i>
            <input type="number" class="input text-center" min="1"
            max="10000" value="${eachProduct.count}">
            <i class="fa-solid fa-plus plus"></i>
        </td>
        <td class="total-product" style="color: #fcb941;">$${(parseFloat(eachProduct.price.substring(1)) * parseInt(eachProduct.count)).toFixed(2)}</td>
        <td class="delete"><i class="fa-solid fa-x delete-all"></i></td>
    </tr>`;
            getProductsCount(cartProducts);
        });

        let minusBtns = document.querySelectorAll(".quantity .minus")
        let plusBtns = document.querySelectorAll(".quantity .plus");

        for (let i = 0; i < minusBtns.length; i++) {
            minusBtns[i].addEventListener("click", function (e) {
                let decreasedProduct = cartProducts.find(m => m.id == minusBtns[i].parentElement.parentElement.getAttribute("data-id"))

                if (decreasedProduct.count > 1) {
                    decreasedProduct.count -= 1;
                    minusBtns[i].nextElementSibling.value = decreasedProduct.count;

                    let productLastPrice = minusBtns[i].parentElement.nextElementSibling.innerText.substring(1);
                    productLastPrice = (parseFloat(productLastPrice) - parseFloat(decreasedProduct.price.substring(1))).toFixed(2);
                    minusBtns[i].parentElement.nextElementSibling.innerText = "$ " + productLastPrice;
                    window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts))

                    document.querySelector(".count-card").innerText--;
                    subtotal.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
                    totalPrice.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
                } else {
                    minusBtns[i].classList.add("unable")
                }
            })
        }

        for (let i = 0; i < plusBtns.length; i++) {
            plusBtns[i].addEventListener("click", function (e) {
                let increasedProduct = cartProducts.find(m => m.id == plusBtns[i].parentElement.parentElement.getAttribute("data-id"))
                increasedProduct.count += 1;
                plusBtns[i].previousElementSibling.value = increasedProduct.count;
                let productLastPrice = plusBtns[i].parentElement.nextElementSibling.innerText.substring(1);
                productLastPrice = (parseFloat(productLastPrice) + parseFloat(increasedProduct.price.substring(1))).toFixed(2);
                plusBtns[i].parentElement.nextElementSibling.innerText = "$ " + productLastPrice;

                window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                document.querySelector(".count-card").innerText++;
                subtotal.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
                totalPrice.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
            })
        }

        let deleteBtns = document.querySelectorAll(".delete-all")
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function (e) {
                e.preventDefault();
                deleteBtns[i].parentElement.parentElement.remove();
                let shouldBeDeleted = cartProducts.find(m => m.id == deleteBtns[i].parentElement.parentElement.getAttribute("data-id"))
                let indexDeleted = cartProducts.indexOf(shouldBeDeleted)
                if (indexDeleted > -1) {
                    cartProducts.splice(indexDeleted, 1)
                }
                localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
                if (cartProducts.length == 0) {
                    productTable.classList.add("d-none")
                    cartPart.classList.remove("d-none")
                }
                let num = parseInt(document.querySelector(".count-card").innerText) - parseInt(deleteBtns[i].parentElement.previousElementSibling.previousElementSibling.children[1].value);
                document.querySelector(".count-card").innerText = num
                subtotal.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
                totalPrice.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
            })
        }

        subtotal.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
        totalPrice.innerText = "$" + `${total(JSON.parse(localStorage.getItem("cartProducts"))).toFixed(2)}`;
    }

    function getProductsCount(arr) {
        let cnt = 0;
        for (const eachItem of arr) {
            cnt += eachItem.count;
        }
        document.querySelector(".count-card").innerText = cnt;
    }

    function total(str) {
        let sum = 0;
        for (const eachStr of str) {
            sum += (parseFloat(eachStr.price.substring(1)) * parseFloat(eachStr.count))
        }
        return sum;
    }


 
})