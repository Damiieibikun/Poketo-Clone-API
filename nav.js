$(document).ready(() => {
  // get relevent info
  const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  let merchant = JSON.parse(localStorage.getItem("Merchant-Poketo"));
  let currentUser = JSON.parse(localStorage.getItem("LoggedUser"));

  // fixed nav functionality
  let sticky = $("#d-fixedNav").get(0).offsetTop;
  $(window).on("scroll", function () {
    if (window.pageYOffset > sticky) {
      $("#d-fixedNav").addClass("d-sticky-nav");
      $("#d-shop-family").slideUp();
    } else {
      $("#d-fixedNav").removeClass("d-sticky-nav");
      $("#d-shop-family").slideDown();
    }
  });

  // dropdown menu
  $("#d-left-nav")
    .find("li")
    .each((i, element) => {
      if (element.id === "d-showDropdown") {
        $(element).on("mouseover", function () {
          $("#d-nav-dropdown-menu").removeClass("d-display-none");
        });
      } else {
        $(element).on("mouseover", function () {
          $("#d-nav-dropdown-menu").addClass("d-display-none");
        });
      }
    });

  // hide and show dropdown menu
  $("#d-nav-dropdown-menu").on("mouseover", function () {
    $("#d-nav-dropdown-menu").removeClass("d-display-none");
  });

  $("#d-nav-dropdown-menu").on("mouseout", function () {
    $(this).addClass("d-display-none");
  });

  // add class to stars
  $(".d-footer-rating svg").on("mouseover", function () {
    $(this).addClass("d-stars");
  });

  // open and close cart details
  $("#d-cart-nav").click(function () {
    $("#d-cart-modal").css("display", "flex");
    $("#d-cart-info").animate({ left: "0" });
    $("body").css("overflow", "hidden");
  });

  $("#d-close-cart").click(function () {
    $("#d-cart-info").animate({ left: "100%" });
    $("#d-cart-modal").css("display", "none");
    $("body").css("overflow", "visible");
  });

  // select colors
  $(document).on("click", ".d-color-selection", function () {
    $(this).parent().addClass("d-selected-color");
    $(this).parent().siblings().removeClass("d-selected-color");
    $("#d-variantSelection").text($(this).parent().attr("id"));
    // console.log($(this).parent().attr("id"));
  });

  // redirect to login
  $("#d-account-nav").click(function () {
    window.location.href = "login.html";
  });
  // redirect to account details info
  $("#d-account-logout, #d-login-hamburger").click(function () {
    window.location.href = "user.html";
  });

  //redirect to home
  $("#logo").click(function () {
    window.location.href = "index.html";
  });

  $("#logo-responsive").click(function () {
    window.location.href = "index.html";
  });

  // check out button
  $("#d-checkout-btn").click(function () {
    if ($(this).text() === "CONTINUE SHOPPING") {
      window.location.href = "index.html";
    } else {
      // proceed to checkout
      console.log("Checkout");
      window.location.href = 'user.html'
    }
  });

  // open and close hamburger menu
  let clicked = true;
  $("#d-hamburger-menu-icon").click(function () {
    if (clicked) {
      $("#d-hamburger-menu").animate({ left: "0" });
      $("body").css("overflow", "hidden");
    } else {
      $("#d-hamburger-menu").animate({ left: "-100%" });
      $("body").css("overflow", "visible");
    }
    clicked = !clicked;
  });

  if (currentUser === null) {
    $("#d-checkout-btn").text("CONTINUE SHOPPING");
    $("#d-cart-contents").css("height", "47vh");
    $("#d-account-logout").hide();
    // populate cart with some items
    $.ajax({
      url: `${endPoint}/products?merchant_id=${merchant.id}`,
      method: "GET",
      success: function (res) {
        // get products for each slider
        if (res.length === 0) {
          $("#d-cart-contents").html(`<h1>No Items Availiable</h1>`);
        } else {
          let cartProducts = res.data.splice(0, 4);
          cartProducts.forEach((product) => {
            $("#d-cart-contents").append(` <div class="d-grid d-cart-item-desc">
            <div class="d-flex d-gap-20">
              <img src=${product.image} width="30%" />
              <div class="d-flex-col" style="justify-content: space-between">
                <p id="d-title-item">${product.title}</p>
                
                <p id="d-price-item">$${product.price}</p>
              </div>
            </div>          
              
              <div class="d-flex d-align-center d-justify-center" data-id=${product.id}>
                <button class="d-AddBtn-cart">Add</button>
                </div>
            </div>
          </div>
          <hr style="opacity: 0.5" />`);
          });
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    $("#d-account-nav").hide();
    $("#d-login-hamburger").text("Logout / Account");

    // populate with cart items
    let usersItems = JSON.parse(localStorage.getItem("CurrentUser-cartItems"));
    usersItems.forEach((user) => {
      if (currentUser.id === user.user_id) {
        // check if cart is empty
        let cartItemNumber = user.cartItems.length;
        $("#d-num-items").text(`(${cartItemNumber} items)`);
        $("#d-cart-items-num").text(`${cartItemNumber}`);
        if (cartItemNumber === 0) {
          $("#d-checkout-btn").text("CONTINUE SHOPPING");
          $("#d-cart-contents").css("height", "47vh");
          // populate cart with some items
          $.ajax({
            url: `${endPoint}/products?merchant_id=${merchant.id}`,
            method: "GET",
            success: function (res) {
              // get products for each slider
              if (res.length === 0) {
                $("#d-cart-contents").html(`<h1>No Items Availiable</h1>`);
              } else {
                let cartProducts = res.data.splice(0, 4);
                cartProducts.forEach((product) => {
                  $("#d-cart-contents")
                    .append(` <div class="d-grid d-cart-item-desc">
                        <div class="d-flex d-gap-20">
                          <img src=${product.image} width="30%" />
                          <div class="d-flex-col" style="justify-content: space-between">
                            <p id="d-title-item">${product.title}</p>
                            
                            <p id="d-price-item">$${product.price}</p>
                          </div>
                        </div>          
                          
                          <div class="d-flex d-align-center d-justify-center" data-id=${product.id}>
                            <button class="d-AddBtn-cart">Add</button>
                            </div>
                        </div>
                      </div>
                      <hr style="opacity: 0.5" />`);
                });
              }
            },
            error: function (err) {
              console.log(err);
            },
          });
        } else {
          $("#d-taxShiping-info").removeClass("d-display-none");
          $("#d-freeShipping").removeClass("d-display-none");
          $("#d-empty-cart").hide();
          $("#d-cart-contents").empty();
          $("#d-loveProducts").hide();

          user.cartItems.forEach((item, i) => {
            let productID = item.itemId;

            $.ajax({
              url: `${endPoint}/products/${productID}`,
              method: "GET",
              success: function (res) {
                var cartDetails = JSON.parse(
                  localStorage.getItem("CurrentUser-cartItems")
                );
                if (cartDetails !== null) {
                  cartDetails.forEach((user) => {
                    if (currentUser.id === user.user_id) {
                      user.cartItems.forEach((item) => {
                        if (item.itemId === res.id) {
                          item.price = res.price;
                          localStorage.setItem(
                            "CurrentUser-cartItems",
                            JSON.stringify(cartDetails)
                          );
                        }
                      });
                    }
                  });
                }

                // console.log(res)
                // totalPrice += parseInt(res.price * item.quantity);

                $("#d-cart-contents").append(
                  `<div class="d-grid d-cart-item-desc" data-id=${res.id}>
              <div class="d-flex d-gap-20">
                <img
                  src=${res.images[0]}
                  width="30%"
                />
                <div class="d-flex-col" style="justify-content: space-between">
                  <p class="d-title-item">${res.title}</p>
                  <p>$<span class="d-price-item">${
                    res.price * item.quantity
                  }</span></p>
                </div>
              </div>

              <div class="d-flex-col d-cart-item-desc-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                  data-id = ${i}
                >
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                  />
                </svg>
                <div
                  class="d-flex d-align-center d-justify-center"
                  id="d-add-remove-num"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-dash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"
                    />
                  </svg>
                  <input type="text" name="" class="d-amt-items" value=${
                    item.quantity
                  } />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <hr style="opacity: 0.5;">`
                );

                var cartDetails = JSON.parse(
                  localStorage.getItem("CurrentUser-cartItems")
                );
                if (cartDetails !== null) {
                  cartDetails.forEach((user) => {
                    if (currentUser.id === user.user_id) {
                      let total = 0;
                      user.cartItems.forEach((item) => {
                        // let total = 0;
                        let price = item.quantity * item.price;
                        total += price;
                      });
                      // console.log(total);
                      $("#d-price").text(`$${total}`);
                    }
                  });
                }
              },
              error: function (err) {
                console.log(err);
              },
            });
          });
        }
      }
    });
  }

  // increase cart items
  $(document).on("click", ".bi-plus", function () {
    let amount = $(this).prev().val();
    $(this).prev().val(`${++amount}`);
    var cartDetails = JSON.parse(localStorage.getItem("CurrentUser-cartItems"));
    if (cartDetails !== null) {
      cartDetails.forEach((user) => {
        if (currentUser.id === user.user_id) {
          user.cartItems.forEach((item) => {
            if (
              item.itemId === $(this).parents(".d-cart-item-desc").data("id") ||
              item.itemId ===
                $(this).parents(".items-jenny").prev().children().data("id")
            ) {
              item.quantity = amount;
              $(this)
                .parent()
                .parent()
                .prev()
                .find(".d-price-item")
                .text(item.price * $(this).prev().val());
              localStorage.setItem(
                "CurrentUser-cartItems",
                JSON.stringify(cartDetails)
              );
            }
          });
        }
      });
    }

    //get total

    var cartDetails = JSON.parse(localStorage.getItem("CurrentUser-cartItems"));
    if (cartDetails !== null) {
      cartDetails.forEach((user) => {
        if (currentUser.id === user.user_id) {
          let total = 0;
          user.cartItems.forEach((item) => {
            // let total = 0;
            let price = item.quantity * item.price;
            total += price;
          });
          // console.log(total);
          $("#d-price").text(`$${total}`);
        }
      });
    }
  });

  // decrease cart items
  $(document).on("click", ".bi-dash", function () {
    let amount = $(this).next().val();
    if (amount > 1) {
      $(this).next().val(`${--amount}`);
      let cartDetails = JSON.parse(
        localStorage.getItem("CurrentUser-cartItems")
      );
      if (cartDetails !== null) {
        cartDetails.forEach((user) => {
          if (currentUser.id === user.user_id) {
            user.cartItems.forEach((item) => {
              if (
                item.itemId ===
                  $(this).parents(".d-cart-item-desc").data("id") ||
                item.itemId ===
                  $(this).parents(".items-jenny").prev().children().data("id")
              ) {
                item.quantity = amount;
                $(this)
                  .parent()
                  .parent()
                  .prev()
                  .find(".d-price-item")
                  .text(item.price * $(this).next().val());
                localStorage.setItem(
                  "CurrentUser-cartItems",
                  JSON.stringify(cartDetails)
                );
              }
            });
          }
        });
      }
    }

    //get total
    let cartDetails = JSON.parse(localStorage.getItem("CurrentUser-cartItems"));
    if (cartDetails !== null) {
      cartDetails.forEach((user) => {
        if (currentUser.id === user.user_id) {
          let total = 0;
          user.cartItems.forEach((item) => {
            // let total = 0;
            let price = item.quantity * item.price;
            total += price;
          });
          // console.log(total);
          $("#d-price").text(`$${total}`);
        }
      });
    }
  });

  // add products to cart from product page
  $("#addCart-Product").click(function (e) {
    e.stopPropagation();
    let addedItemID = $(this).parent().prev().children().data("id");
    let quantity = $(this).prev().find(".d-amt-items").val();

    if (currentUser === null) {
      window.location.href = "login.html";
    } else {
      console.log(addedItemID);
      console.log(quantity);
      console.log(
        $(this).parent().prev().find("#d-selectedproductPrice").text()
      );

      let usersItems =
        JSON.parse(localStorage.getItem("CurrentUser-cartItems")) || [];
      let userFound = false;

      usersItems.forEach((user) => {
        if (user.user_id === currentUser.id) {
          userFound = true;
          let itemFound = false;

          user.cartItems.forEach((item) => {
            if (item.itemId === addedItemID) {
              itemFound = true;
            }
          });

          if (!itemFound) {
            let addedItem = {
              itemId: addedItemID,
              quantity: quantity,
            };
            user.cartItems.push(addedItem);
            localStorage.setItem(
              "CurrentUser-cartItems",
              JSON.stringify(usersItems)
            );
            location.reload(true);
          } else {
            alert("Item already added to cart");
          }
        }
      });

      if (!userFound) {
        alert("User not found. Please log in or register.");
      }
    }
  });

  // add products to cart from anywhere else
  $(document).on("click", ".d-AddBtn-cart, .d-addCart", function (e) {
    e.stopPropagation();
    if (currentUser === null) {
      window.location.href = "login.html";
    } else {
      console.log("item added");
      let productID = $(this).parent().data("id");

      let usersItems =
        JSON.parse(localStorage.getItem("CurrentUser-cartItems")) || [];
      let userFound = false;

      usersItems.forEach((user) => {
        if (user.user_id === currentUser.id) {
          userFound = true;
          let itemFound = false;

          user.cartItems.forEach((item) => {
            if (item.itemId === productID) {
              itemFound = true;
            }
          });

          if (!itemFound) {
            let addedItem = {
              itemId: productID,
              quantity: 1,
            };
            user.cartItems.push(addedItem);
            localStorage.setItem(
              "CurrentUser-cartItems",
              JSON.stringify(usersItems)
            );
            location.reload(true);
          } else {
            alert("Item already added to cart");
          }
        }
      });

      if (!userFound) {
        alert("User not found. Please log in or register.");
      }
    }
  });

  // delete from cart

  $(document).on("click", ".bi-trash3", function () {
    let itemIndex = $(this).data("id");
    console.log(itemIndex);
    // let itemId = $(this).data("id");
    let usersItems = JSON.parse(localStorage.getItem("CurrentUser-cartItems"));
    usersItems.forEach((user) => {
      if (user.user_id === currentUser.id) {
        user.cartItems.splice(itemIndex, 1);
        localStorage.setItem(
          "CurrentUser-cartItems",
          JSON.stringify(usersItems)
        );
        location.reload(true);
      }
    });
  });

  // add style to selected size
  $(document).on("click", ".d-selectedProductSize", function () {
      $(this).addClass('sizeOuter-border')
      $(this).siblings().removeClass('sizeOuter-border')
  })
});
