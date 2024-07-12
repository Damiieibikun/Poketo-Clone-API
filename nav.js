$(document).ready(() => {
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
      console.log(element.id);
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

  // Current User's Cart info
  let userProducts = JSON.parse(localStorage.getItem("UserProducts")) || [];
  if(userProducts.length === 0){
    $("#d-checkout-btn").text("CONTINUE SHOPPING");
    $("#d-cart-contents").css("height", "47vh");
  }
  userProducts.forEach((user) => {
    if (currentUser === user) {
      // check if cart is empty
      let cartItemNumber = user.cartInfo.length
      if (cartItemNumber === 1) {
        $("#d-taxShiping-info").removeClass("d-display-none");
        $("#d-empty-cart").hide();
        $("#d-cart-contents").empty();
        $("#d-loveProducts").hide();
        $("#d-cart-contents").css("height", "43vh");
      } else if (cartItemNumber > 1) {
        $("#d-taxShiping-info").removeClass("d-display-none");
        $("#d-freeShipping").removeClass("d-display-none");
        $("#d-empty-cart").hide();
        $("#d-cart-contents").empty();
        $("#d-loveProducts").hide();
      } else {
        $("#d-checkout-btn").text("CONTINUE SHOPPING");
        $("#d-cart-contents").css("height", "47vh");
     
      user.cartInfo.forEach((item) => {
        $("#d-cart-contents").append(
          `<div class="d-grid d-cart-item-desc">
            <div class="d-flex d-gap-20">
              <img
                src=${item.img}
                width="30%"
              />
              <div class="d-flex-col" style="justify-content: space-between">
                <p id="d-title-item">${item.productName}</p>
                <p id="d-chosenColor-item"> Red</p>
                <p id="d-price-item">$${item.price}</p>
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
                <input type="text" name="" class="d-amt-items" value="1" />
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
      });
    }
    }
  });


});
