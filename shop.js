$(document).ready(() => {
  localStorage.removeItem("ProductV");
  const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  let merchant = JSON.parse(localStorage.getItem("Merchant-Poketo"));

  $.ajax({
    url: `${endPoint}/products?merchant_id=${merchant.id}&limit=20`,
    method: "GET",
    success: function (resp) {
      // console.log(resp.data.length)
      $(".d-num-itemsShopAll").text(`${resp.data.length} items`);
      resp.data.forEach((res) => {
        let productImages = [];
        let productColor = [];
        let productDiscount = null;
        $.ajax({
          url: `${endPoint}/products/${res.id}`,
          method: "GET",
          success: function (data) {
            productDiscount = data.discount;

            let allVariations =
              JSON.parse(localStorage.getItem("ProductV")) || [];
            if (data.variations.length !== 0) {
              data.variations[0].content.forEach((content) => {
                if (content.display[0].type === "image") {
                  productImages.push(content.display[0].value);
                } else if (content.display[0].type === "text") {
                  productColor.push(content.display[0].value);
                }
              });
              let productVariationsInfo = {
                product_id: res.id,
                availableImage: productImages,
                availableColors: productColor,
                productDiscount: productDiscount,
              };
              allVariations.push(productVariationsInfo);
            } else {
              let productVariationsInfo = {
                product_id: res.id,
                productDiscount: productDiscount,
              };
              allVariations.push(productVariationsInfo);
            }
            localStorage.setItem("ProductV", JSON.stringify(allVariations));
          },
          error: function (err) {
            console.log(err);
          },
        });
      });

      let products = resp.data;
      products.forEach((product) => {
        let avgRating = 0;
        let totalRating = 0;
        $.ajax({
          url: `${endPoint}/ratings?product_id=${product.id}`,
          method: "GET",
          success: function (rating) {
            if (rating.length > 0) {
              rating.forEach((item) => {
                totalRating += item.value;
              });
              // calculate average rating
              avgRating = (totalRating / rating.length).toFixed(1);
            }

            var itemProduct = {};

            if (product.review === 0 && product.total_sold === 0) {
              var itemProduct = {
                tag: "New!",
                tagColor: "#73ccf3",
              };
            } else if (
              product.review > 1 &&
              avgRating > 3.5 &&
              product.like > 0
            ) {
              var itemProduct = {
                tag: "Best Seller",
                tagColor: "#ffc845",
              };
            } else {
              var itemProduct = {
                tag: "New!",
                tagColor: "#73ccf3",
              };
            }
            let showStars = "flex";
            if (product.quantity === null) {
              showStars = "none";
            }

            let likeTerm = "";
            if (product.like === 1) {
              likeTerm = "like";
            } else {
              likeTerm = "likes";
            }

            let showDiscount = "";
            let discountStyle = "";
            let colorStyle = "black";
            if (product.has_discount) {
              showDiscount = "block";
              discountStyle = "line-through";
              colorStyle = "grey";
            } else {
              showDiscount = "none";
            }

            let productItem = $(`<div class="d-grid">
                    <div class="d-slider-product-item d-flex" data-id = ${product.id} style="background-image: url(${product.image})" onMouseOver="this.style.backgroundImage='url(${product.images[1]})'" onMouseOut="this.style.backgroundImage='url(${product.image})'">
                        <div class="d-item-tag" style="background-color: ${itemProduct.tagColor}">${itemProduct.tag}</div>
                        <button class="d-addCart d-display-none">Add to Cart</button>
                    </div>
                    <div class="d-slider-product-desc">
                        <p class="d-product-title-slider">${product.title}</p>
                        <div class="d-flex d-justify-between d-align-center">
                            <div class="star" style = "display: ${showStars}">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#f6ede6"></path></svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z"
                                    fill="#f6ede6"></path>
                                </svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#f6ede6"></path></svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z"
                                        fill="#f6ede6"></path>
                                    </svg>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#f6ede6"></path></svg>
                                <span class="d-slider-product-rating">${avgRating} <span class='d-quantity-avail'>(${product.quantity})</span></span>
                            </div>
                            <div class="d-flex d-gap-10">
                            <span class="d-slider-product-price" style="text-decoration: ${discountStyle}; color: ${colorStyle}">$${product.price}</span> <span class="d-discountedPriceValue" style = display:${showDiscount}></span>
                            </div>
                           
                        </div>
                            <div class="d-product-colors d-flex d-gap-10">
    
                        </div>
                        <div class="d-product-likes d-flex d-gap-10 d-align-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
                            <span>${product.like}</span><span>${likeTerm}</span>
                    </div>
                        
                        
                    </div>
                </div>`);

            let productRating = productItem.find(".star").find("svg");
            if (avgRating > 0) {
              productRating.each((i, svg) => {
                $(svg).find("path").css("fill", "#ef4043");
                if (i === Math.round(avgRating) - 1) {
                  return false;
                }
              });
            }

            let productV = JSON.parse(localStorage.getItem("ProductV"));

            productV.forEach((productItems) => {
              if (productItems.product_id === product.id) {
                productItem
                  .find(".d-discountedPriceValue")
                  .text(
                    `$${Math.round(
                      product.price -
                        (productItems.productDiscount / 100) * product.price
                    )}`
                  );

                if (
                  "avaliableImage" in productItems ||
                  "availableColors" in productItems
                ) {
                  if (productItems.availableImage.length > 0) {
                    productItems.availableImage.forEach((img, i) => {
                      productItem.find(".d-product-colors")
                        .append(`<div class="d-color-selection-outer">
                           <div class="d-color-selection" data-id=${i}" style="background-image: url(${img}); background-color: transparent"></div>
                       </div>`);
                    });
                  }
                  if (productItems.availableColors.length > 0) {
                    productItems.availableColors.forEach((color, i) => {
                      productItem.find(".d-product-colors")
                        .append(`<div class="d-color-selection-outer">
                           <div class="d-color-selection" data-id=${i}" style="background-image: url(''); background-color: ${color}"></div>
                       </div>`);
                    });
                  }
                }
              }
            });

            productItem.find(".d-product-colors").each((index, i) => {
              if ($(i).children()[0]) {
                $(i).children()[0].classList.add("d-selected-color");
              }
            });

            $("#d-shopAll-grid-items").append(productItem);
          },
          error: function (err) {
            console.log(err);
          },
        });
      });
    },
    error: function (err) {
      console.log(err);
    },
  });

  $(".d-product-colors").each((index, i) => {
    if ($(i).children()[0]) {
      $(i).children()[0].classList.add("d-selected-color");
    }
  });

  $(document).on("mouseover", ".d-slider-product-item", function () {
    $(this).find(".d-addCart").show();
  });

  $(document).on("mouseout", ".d-slider-product-item", function () {
    $(this).find(".d-addCart").hide();
  });

  $(document).on("click", ".d-slider-product-item", function () {
    let selectedId = $(this).data("id");
    $.ajax({
      url: `${endPoint}/products/${selectedId}`,
      method: "GET",
      success: function (res) {
        localStorage.setItem("Selected-Product", JSON.stringify(res));
        window.location.href = "product.html";
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
