$(function () {
   
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
  


    let wishlisted = JSON.parse(localStorage.getItem("wishlisted"));
    let tableBody = document.querySelector("tbody");
    let cartPart = document.querySelector("#cart-part")
    let productTable = document.querySelector("#product-table")


    if (wishlisted.length != 0) {
        productTable.classList.remove("d-none")
        cartPart.classList.add("d-none")
        getWishlistCount(wishlisted);
        wishlisted.forEach(wish => {
            tableBody.innerHTML += `<tr 
            data-id="${wish.id}">
            <td class="image"><img src="${wish.image}" alt=""></td>
            <td class="name" style="color:#49b3ff;">${wish.name}</td>
            <td class="oneprice " style="color:green;">${wish.price}</td>
        
          
            <td class="delete"><i class="fa-solid fa-x delete-all"></i></td>
        </tr>`;
            getWishlistCount(wishlisted);
        });

        let deleteBtns = document.querySelectorAll(".delete-all")
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click", function (e) {
                e.preventDefault();
                deleteBtns[i].parentElement.parentElement.remove();
                let shouldBeDeleted = wishlisted.find(m => m.id == deleteBtns[i].parentElement.parentElement.getAttribute("data-id"))
                let indexDeleted = wishlisted.indexOf(shouldBeDeleted)
                if (indexDeleted > -1) {
                    wishlisted.splice(indexDeleted, 1)
                }
                localStorage.setItem("wishlisted", JSON.stringify(wishlisted))
                if (wishlisted.length == 0) {
                    productTable.classList.add("d-none")
                    cartPart.classList.remove("d-none")
                }
                let num = parseInt(document.querySelector(".wishlist-sup").innerText) - 1;
                document.querySelector(".wishlist-sup").innerText = num
            })
        }
    } else {
        productTable.classList.add("d-none")
        cartPart.classList.remove("d-none")
    }

    function getWishlistCount(arr) {
        let cnt = 0;
        for (const eachItem of arr) {
            cnt += eachItem.count;
            document.querySelector(".wishlist-sup").innerText = cnt;
        }
    }

   

   

})