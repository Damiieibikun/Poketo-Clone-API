$(document).ready(function () {
  localStorage.removeItem("ProductV");
  const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  let merchant = JSON.parse(localStorage.getItem("Merchant-Poketo"));

  //slick functions
  $(".slider-nav1").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // at 1024px and below
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // at 768px and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // at 480px and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: ".d-prev-arrow",
    nextArrow: ".d-next-arrow",
  });
  $(".slider-nav2").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // at 1024px and below
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // at 768px and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // at 480px and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: ".d-prev-arrow2",
    nextArrow: ".d-next-arrow2",
  });

  // get all products posted by merchant
  $.ajax({
    url: `${endPoint}/products?merchant_id=${merchant.id}&limit=20`,
    method: "GET",
    success: function (resp) {
      resp.data.forEach((res) => {
        let productImages = [];
        let productColor = [];
        let productDiscount = null;
        let productSizes = []
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

              if(data.variations[1]){
                data.variations[1].content.forEach((content) => {
                  productSizes.push(content.text)
                });
              } 


              let productVariationsInfo = {
                product_id: res.id,
                availableImage: productImages,
                availableColors: productColor,
                productDiscount: productDiscount,
                Sizes: productSizes
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

      // get products for each slider
      let productsDataCopy = [...resp.data];

      let products1 = productsDataCopy.slice(0, 10);
      let products2 = productsDataCopy.slice(10, 20);

      products1.forEach((product) => {
        // get average rating for product
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
            let showSize = "none";
            if ("size" in product) {
              showSize = "flex";
            }

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
            let productItem1 =
              $(` <div class="d-slick-items d-grid d-justify-center">
         <div class="d-slider-product-item d-flex" data-id =${product.id} style="background-image: url(${product.image})" onMouseOver="this.style.backgroundImage='url(${product.images[1]})'" onMouseOut="this.style.backgroundImage='url(${product.image})'">
             <div class="d-item-tag" style="background-color: ${itemProduct.tagColor}">${itemProduct.tag}</div>
             <button class="d-addCart d-display-none">Add to Cart</button>
         </div>
         <div class="d-slider-product-desc">
             <p class="d-product-title-slider">${product.title}</p>
             <div class="d-flex d-justify-between d-align-center">
                 <div class="star">
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
                            <span class="d-slider-product-price" style="text-decoration: ${discountStyle}; color: ${colorStyle}">$${product.price}</span> <span class="d-discountedPriceValue" style = "display:${showDiscount}"></span>
                            </div>
             </div>
             <div class="d-gap-20 d-product-selected-size" style="display: ${showSize};">
                 <div class="d-selected-size">Large</div>
                 <div> Small</div>
             </div>
             <div class = "d-product-sizes d-flex d-gap-10">
                        
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

            let productRating = productItem1.find(".star").find("svg");
            if (avgRating >= 1) {
              productRating.each((i, svg) => {
                $(svg).find("path").css("fill", "#ef4043");
                if (i === Math.round(avgRating) - 1) {
                  return false;
                }
              });
            }

            let productV = JSON.parse(localStorage.getItem("ProductV"));
            if (productV !== null) {
              productV.forEach((productItem) => {
                if (productItem.product_id === product.id) {
                  productItem1
                    .find(".d-discountedPriceValue")
                    .text(
                      `$${Math.round(
                        product.price -
                          (productItem.productDiscount / 100) * product.price
                      )}`
                    );

                  if (
                    "avaliableImage" in productItem ||
                    "availableColors" in productItem || 'Sizes' in productItem
                  ) {
                    if (productItem.availableImage.length > 0) {
                      productItem.availableImage.forEach((img, i) => {
                        productItem1.find(".d-product-colors")
                          .append(`<div class="d-color-selection-outer">
                           <div class="d-color-selection" data-id=${i}" style="background-image: url(${img}); background-color: transparent"></div>
                       </div>`);
                      });
                    }
                    if (productItem.availableColors.length > 0) {
                      productItem.availableColors.forEach((color, i) => {
                        productItem1.find(".d-product-colors")
                          .append(`<div class="d-color-selection-outer">
                           <div class="d-color-selection" data-id=${i}" style="background-image: url(''); background-color: ${color}"></div>
                       </div>`);
                      });
                    }
                    if(productItem.Sizes.length > 0){
                      productItem.Sizes.forEach((size, i)=>{
                        if(i === 0){
                          productItem1.find(".d-product-sizes").append(`<div class='d-selectedProductSize sizeOuter-border'>${size}</div>`)
                        }
                        else{
                          productItem1.find(".d-product-sizes").append(`<div class='d-selectedProductSize'>${size}</div>`)
                        }
                       
                      })
                    }
                  }
                }
              });
            }

            productItem1.find(".d-product-colors").each((index, i) => {
              if ($(i).children()[0]) {
                $(i).children()[0].classList.add("d-selected-color");
              }
            });

            $(".slider-nav1").slick("slickAdd", productItem1);
          },
          error: function (err) {
            console.log(err);
          },
        });
      });

      products2.forEach((product2) => {
        // get average rating for product
        let avgRating = 0;
        let totalRating = 0;
        $.ajax({
          url: `${endPoint}/ratings?product_id=${product2.id}`,
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

            if (product2.review === 0 && product2.total_sold === 0) {
              var itemProduct = {
                tag: "New!",
                tagColor: "#73ccf3",
              };
            } else if (
              product2.review > 1 &&
              avgRating > 4 &&
              product2.like > 0
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
            if (product2.quantity === null) {
              showStars = "none";
            }
            let likeTerm = "";
            if (product2.like === 1) {
              likeTerm = "like";
            } else {
              likeTerm = "likes";
            }
            let showDiscount = "";
            let discountStyle = "";
            let colorStyle = "black";
            if (product2.has_discount) {
              showDiscount = "block";
              discountStyle = "line-through";
              colorStyle = "grey";
            } else {
              showDiscount = "none";
            }

            let productItem2 =
              $(`<div class="d-slick-items d-grid d-justify-center">
       <div class="d-slider-product-item d-flex" data-id = ${product2.id} style="background-image: url(${product2.image})" onMouseOver="this.style.backgroundImage='url(${product2.images[1]})'" onMouseOut="this.style.backgroundImage='url(${product2.image})'">
           <div class="d-item-tag" style ="background-color: ${itemProduct.tagColor}">${itemProduct.tag}</div>
           <button class="d-addCart d-display-none">Add to Cart</button>
       </div>
       <div class="d-slider-product-desc">
           <p class="d-product-title-slider">${product2.title}</p>
           <div class="d-flex d-justify-between d-align-center">
               <div class="star" style="display:${showStars}">
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path></svg>
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z"
                           fill="#dedede"></path>
                       </svg>
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path></svg>
                   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z"
                               fill="#dedede"></path>
                           </svg>
                           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path></svg>
                   <span class="d-slider-product-rating">${avgRating} <span class='d-quantity-avail'>(${product2.quantity})</span></span>
               </div>
               <div class="d-flex d-gap-10">
                            <span class="d-slider-product-price" style="text-decoration: ${discountStyle}; color: ${colorStyle}">$${product2.price}</span> <span class="d-discountedPriceValue" style = "display:${showDiscount}"></span>
                            </div>
           </div>
           <div class = "d-product-sizes d-flex d-gap-10">
                        
                        </div>
           <div class="d-product-colors d-flex d-gap-10">

             </div>
           <div class="d-product-likes d-flex d-gap-10">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
                       <span>${product2.like}</span><span>${likeTerm}</span>
               </div>

       </div>
   </div>`);

            let productRating = productItem2.find(".star").find("svg");
            if (avgRating >= 1) {
              productRating.each((i, svg) => {
                $(svg).find("path").css("fill", "#ef4043");
                if (i === Math.round(avgRating) - 1) {
                  return false;
                }
              });
            }

            let productV = JSON.parse(localStorage.getItem("ProductV"));
            if (productV !== null) {
              productV.forEach((productItem) => {
                if (productItem.product_id === product2.id) {
                  productItem2
                    .find(".d-discountedPriceValue")
                    .text(
                      `$${Math.round(
                        product2.price -
                          (productItem.productDiscount / 100) * product2.price
                      )}`
                    );

                  if (
                    "avaliableImage" in productItem ||
                    "availableColors" in productItem || 'Sizes' in productItem
                  ) {
                    if (productItem.availableImage.length > 0) {
                      productItem.availableImage.forEach((img, i) => {
                        productItem2.find(".d-product-colors")
                          .append(`<div class="d-color-selection-outer">
                               <div class="d-color-selection" data-id=${i}" style="background-image: url(${img}); background-color: transparent"></div>
                           </div>`);
                      });
                    }
                    if (productItem.availableColors.length > 0) {
                      productItem.availableColors.forEach((color, i) => {
                        productItem2.find(".d-product-colors")
                          .append(`<div class="d-color-selection-outer">
                               <div class="d-color-selection" data-id=${i}" style="background-image: url(''); background-color: ${color}"></div>
                           </div>`);
                      });
                    }

                    if(productItem.Sizes.length > 0){
                      productItem.Sizes.forEach((size, i)=>{
                        if(i === 0){
                          productItem2.find(".d-product-sizes").append(`<div class='d-selectedProductSize sizeOuter-border'>${size}</div>`)
                        }
                        else{
                          productItem2.find(".d-product-sizes").append(`<div class='d-selectedProductSize'>${size}</div>`)
                        }
                       
                      })
                    }
                  }
                }
              });
            }

            productItem2.find(".d-product-colors").each((index, i) => {
              if ($(i).children()[0]) {
                $(i).children()[0].classList.add("d-selected-color");
              }
            });

            $(".slider-nav2").slick("slickAdd", productItem2);
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

  // $(document).find(".d-product-colors").each((index, i) => {
  //   if ($(i).children()[0]) {
  //     $(i).children()[0].classList.add("d-selected-color");
  //   }
  // });

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
