$(document).ready(() => {
  localStorage.removeItem("ProductV");
  //get 4 items
  const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  let merchant = JSON.parse(localStorage.getItem("Merchant-Poketo"));
  let loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));

  $.ajax({
    url: `${endPoint}/products?merchant_id=${merchant.id}`,
    method: "GET",
    success: function (resp) {
      resp.data.forEach((res) => {
        // console.log(res)
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
                if(data.variations[0].type === 'color'){
                  data.variations[0].content.forEach((content) => {
                    if (content.display[0].type === "image") {
                      productImages.push(content.display[0].value);
                    } else if (content.display[0].type === "text") {
                      productColor.push(content.display[0].value);
                    }
                  });
                }
                else{
                  data.variations[0].content.forEach((content) => {
                    productSizes.push(content.text)
                  });
                }
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

      let otherItems = resp.data.splice(0, 4);

      otherItems.forEach((product) => {
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

            if (product.review === 0 && product.total_sold === 0) {
              var itemProduct = {
                tag: "New!",
                tagColor: "#73ccf3",
              };
            } else if (
              product.review > 1 &&
              avgRating > 4 &&
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
            let productItems_shop = $(`<div class="d-grid">
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
                            <span class="d-slider-product-price" style="text-decoration: ${discountStyle}; color: ${colorStyle}">$${product.price}</span> <span class="d-discountedPriceValue" style = "display:${showDiscount}"></span>
                            </div>
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

            let productRating = productItems_shop.find(".star").find("svg");
            if (avgRating >= 1) {
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
                productItems_shop
                  .find(".d-discountedPriceValue")
                  .text(
                    `$${Math.round(
                      product.price -
                        (productItems.productDiscount / 100) * product.price
                    )}`
                  );

                if (
                  "avaliableImage" in productItems ||
                  "availableColors" in productItems || 'Sizes' in productItems
                ) {
                  if (productItems.availableImage.length > 0) {
                    productItems.availableImage.forEach((img, i) => {
                      productItems_shop.find(".d-product-colors")
                        .append(`<div class="d-color-selection-outer">
                             <div class="d-color-selection" data-id=${i}" style="background-image: url(${img}); background-color: transparent"></div>
                         </div>`);
                    });
                  }
                  if (productItems.availableColors.length > 0) {
                    productItems.availableColors.forEach((color, i) => {
                      productItems_shop.find(".d-product-colors")
                        .append(`<div class="d-color-selection-outer">
                             <div class="d-color-selection" data-id=${i}" style="background-image: url(''); background-color: ${color}"></div>
                         </div>`);
                    });
                  }
                  if(productItems.Sizes.length > 0){
                    productItems.Sizes.forEach((size, i)=>{
                      if(i === 0){
                        productItems_shop.find(".d-product-sizes").append(`<div class='d-selectedProductSize sizeOuter-border'>${size}</div>`)
                      }
                      else{
                        productItems_shop.find(".d-product-sizes").append(`<div class='d-selectedProductSize'>${size}</div>`)
                      }
                     
                    })
                  }
                }
              }
            });

            productItems_shop.find(".d-product-colors").each((index, i) => {
              if ($(i).children()[0]) {
                $(i).children()[0].classList.add("d-selected-color");
              }
            });

            $(".grid-2jen").append(productItems_shop);
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

  // get selected item
  let selectedProduct = JSON.parse(localStorage.getItem("Selected-Product"));
  $.ajax({
    url: `${endPoint}/products/${selectedProduct.id}`,
    method: "GET",
    success: function (res) {
      // console.log(res);
      let avgRating = 0;
      let totalRating = 0;
      let numRating = 0;

      $.ajax({
        url: `${endPoint}/ratings?product_id=${selectedProduct.id}`,
        method: "GET",
        success: function (rating) {
          numRating = rating.length;
          if (rating.length > 0) {
            rating.forEach((item) => {
              totalRating += item.value;
            });

            if (rating.length > 0) {
              let ratinsArry = rating.map((item) => {
                return item.value;
              });
              // console.log(ratinsArry)
              const counter = {};
              ratinsArry.forEach((ele) => {
                if (counter[ele]) {
                  counter[ele] += 1;
                } else {
                  counter[ele] = 1;
                }
              });

              for (let i = 5; i >= 0; i--) {
                // console.log(counter[i]);
                if (counter[i]) {
                  $(`#stars${i}`).text(`${counter[i]}`);
                  $(`#stars${i}`)
                    .prev()
                    .children()
                    .css("width", `${(counter[i] / numRating) * 100}%`);
                } else {
                  $(`#stars${i}`).text(`0`);
                }
              }
            }

            // calculate average rating
            avgRating = (totalRating / rating.length).toFixed(1);
          }

          let showStars = "flex";
          if (res.quantity === null) {
            showStars = "none";
          }

          $(".jenny-item ").css("background-image", `url(${res.images[0]})`);

          // check likes, ratings and reviews
          var selectedProductTag = {};

          if (res.review === 0 && res.total_sold === 0) {
            var selectedProductTag = {
              tag: "New!",
              tagColor: "#73ccf3",
            };
          } else if (res.review > 1 && avgRating > 4 && res.like > 0) {
            var selectedProductTag = {
              tag: "Best Seller",
              tagColor: "#ffc845",
            };
          } else {
            var selectedProductTag = {
              tag: "New!",
              tagColor: "#73ccf3",
            };
          }

          let showDiscount = "";
          let discountStyle = "";
          let colorStyle = "black";
          if (res.has_discount) {
            showDiscount = "block";
            discountStyle = "line-through";
            colorStyle = "grey";
          } else {
            showDiscount = "none";
          }

          $("#j-selectedProduct-info").html(
            ` <div data-id = ${res.id}>
                       <div class="mustard d-align-center" style="background-color: ${
                         selectedProductTag.tagColor
                       };">
                         <p>${selectedProductTag.tag}</p>
                   
                     </div>
                     <div class= "d-flex d-gap-10 d-align-center d-justify-between">
                     <h1>${res.title}</h1> 
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dedede" class="bi bi-heart-fill" viewBox="0 0 16 16"  id="like-Product" data-id = ${
                       res.id
                     }>
                 <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
               </svg>
               
                     </div>
               
                     <div class="jenny-flex">                     
                         <h3 class = "d-flex d-gap-10"><span id="d-selectedproductPrice" style="text-decoration: ${discountStyle}; color: ${colorStyle}">$${
              res.price
            }</span> <span style = "display:${showDiscount}">  $${Math.round(
              res.price - (res.discount / 100) * res.price
            )}</span></h3>

                         <div class = "d-flex">
                         <div class="star" style = "display: ${showStars}">
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
                               </div>
                               <span style = "display: ${showStars}" class="d-slider-product-rating">${avgRating}(${
              res.quantity
            })</span>
                         </div>
                               
                          
                     </div>
                     <p style="font-size: 13px">Size:</p>
                      <div class = "d-product-sizes d-flex">
                     
                        </div>
                     <p id='d-variantSelection'></p>
                     <div class="jenny-icons d-product-colors">
                           <!-- available colors -->
               
                     </div>
                     <div class="jenny-b">
                         <p><span style="color: #456fc7">&#9670;</span> Free Returns & Free Shipping over $50</p>
                     </div>
                     </div>
                     `
          );

          if (res.variations.length !== 0) {

            if(res.variations[0].type === 'color'){
              res.variations[0].content.forEach((content) => {
                if (content.display[0].type === "image") {
                  $("#j-selectedProduct-info").find(".d-product-colors")
                    .append(`<div class="d-color-selection-outer" id=${content.text}>
                         <div class="d-color-selection" style="background-image: url(${content.display[0].value}); background-color: transparent"></div>
                     </div>`);
                } else if (content.display[0].type === "text") {
                  $("#j-selectedProduct-info").find(".d-product-colors")
                    .append(`<div class="d-color-selection-outer" id=${content.text}>
                         <div class="d-color-selection" style="background-image: url(''); background-color: ${content.display[0].value}"></div>
                     </div>`);
                }
  
              });
            }
            else{
              res.variations[0].content.forEach((content, i) => {
                if(i===0){
                  $("#j-selectedProduct-info").find(".d-product-sizes").append(`
                    <div class="d-productPageSizes selectedSizeProduct-Page">${content.text}</div>
                    `)
                }
                else{
                  $("#j-selectedProduct-info").find(".d-product-sizes").append(`
                    <div class="d-productPageSizes">${content.text}</div>
                    `)
                }
                
              });
            }



            
            if(res.variations[1]){              
              res.variations[1].content.forEach((content, i) => {
                if(i===0){
                  $("#j-selectedProduct-info").find(".d-product-sizes").append(`
                    <div class="d-productPageSizes selectedSizeProduct-Page">${content.text}</div>
                    `)
                }
                else{
                  $("#j-selectedProduct-info").find(".d-product-sizes").append(`
                    <div class="d-productPageSizes">${content.text}</div>
                    `)
                }
                
              });
            } 
          }

          $("#j-selectedProduct-info")
            .find(".d-product-colors")
            .each((index, i) => {
              if ($(i).children()[0]) {
                $(i).children()[0].classList.add("d-selected-color");
                console.log($(i).children()[0].id);
                $("#d-variantSelection").text(`Color: ${$(i).children()[0].id}`);
              }
            });

          // get all products liked by a user and compare
          let isLiked = false;

          $.ajax({
            url: `${endPoint}/users/likes?user_id=${loggedUser.id}`,
            method: "GET",
            success: function (res) {
              res.forEach((element) => {
                let productInfo = element.product_id;
                if (
                  productInfo._id ===
                  $("#j-selectedProduct-info").find("#like-Product").data("id")
                ) {
                  isLiked = true;
                  $("#j-selectedProduct-info")
                    .find("#like-Product")
                    .addClass("liked-product");
                }
              });
            },
            error: function (err) {
              console.log(err);
            },
          });

          $("#productDescription-text").html(`${res.descp}`);

          if (res.has_shipment) {
            $("#shippingLocDetails").show();
            res.shipping_locations.forEach((item) => {
              $("#shippingLocDetails").append(`<p>${item}</p>`);
            });
          } else {
            $("#shippingLocDetails").show();
            $("#shippingLocDetails").html(
              `<p>We current are not shipping this item</p>`
            );
          }

          if (res.has_refund_policy) {
            $("#refundDetailsAvail").show();
          } else {
            $("#refundDetailsAvail").show();
            $("#shippingLocDetails").html(
              `<p>We current dont offer refund for this item</p>`
            );
          }

          $(".none").html(`${res.descp}`);

          let productRating = $("#j-selectedProduct-info")
            .find(".star")
            .find("svg");
          if (avgRating > 0) {
            productRating.each((i, svg) => {
              $(svg).find("path").css("fill", "#ef4043");
              if (i === Math.round(avgRating) - 1) {
                return false;
              }
            });
          }
         
          $("#reviewScore").text(avgRating);
          $("#numReviewers").text(`Based on ${numRating} reviews`);
        },
        error: function (err) {
          console.log(err);
        },
      });
    },
    error: function (err) {
      console.log(err);
    },
  });

  // apply styles to selected size
$(document).on('click', '.d-productPageSizes', function(){
  $(this).addClass('selectedSizeProduct-Page')
  $(this).siblings().removeClass('selectedSizeProduct-Page')
})



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

  $(document).on("mouseover", ".d-slider-product-item", function () {
    $(this).find(".d-addCart").show();
  });

  $(document).on("mouseout", ".d-slider-product-item", function () {
    $(this).find(".d-addCart").hide();
  });

  // like a product
  $(document).on("click", "#like-Product", function () {
    let selectedId = $(this).data("id");
    $(this).toggleClass("liked-product");
    if ($(this).hasClass("liked-product")) {
      $.ajax({
        url: `${endPoint}/likes`,
        method: "POST",
        data: {
          product_id: selectedId,
          user_id: loggedUser.id,
        },
        success: function (res) {
          console.log(res);
          // location.reload(true)
        },
        error: function (err) {
          console.log(err);
        },
      });
    } else {
      $.ajax({
        url: `${endPoint}/likes`,
        method: "DELETE",
        data: {
          product_id: selectedId,
          user_id: loggedUser.id,
        },
        success: function (res) {
          console.log(res);
          // location.reload(true)
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });

  $("#add1").click(function () {
    $(".none").show();
    $("#minus1").show();
    $(this).hide();
  });

  $("#add2").click(function () {
    $(".none2").show();
    $("#minus2").show();
    $(this).hide();
  });

  $("#minus1").click(function () {
    $(".none").hide();
    $("#add1").show();
    $(this).hide();
  });

  $("#minus2").click(function () {
    $(".none2").hide();
    $("#add2").show();
    $(this).hide();
  });

  $("#add2").click(function () {
    $(".butter2").css("border-bottom", "none");
  });

  // open reviews modal
  $("#d-createReview").click(function () {
    $("#d-createReview-Modal").removeClass("d-display-none");
  });

  // close reviews modal
  $("#d-closeReviews").click(function () {
    $("#d-createReview-Modal").addClass("d-display-none");
  });

  let valuesRating = ["Very poor", "Poor", "Average", "Good", "Great!"];
  // ratings and reviews
  $(".d-rated").click(function () {
    $(this).addClass("fillRed");
    $(this).prevAll().addClass("fillRed");
    $(this).nextAll().removeClass("fillRed");
    let starID = $(this).data("id");
    // console.log(starID);
    $("#d-ratingValue").text(valuesRating[starID - 1]);
    let data = {
      product_id: selectedProduct.id,
      user_id: loggedUser.id,
      text: valuesRating[starID - 1],
      value: starID,
    };

    $.ajax({
      url: `${endPoint}/ratings`,
      method: "POST",
      data: data,
      success: function (res) {
        console.log(res);
        if (res.msg === "User already made a rating") {
          alert(`${res.msg}; Edit in User's Profile`);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  // create a review

  $("#d-review-From").submit(function (e) {
    e.preventDefault();

    let ratedStars = 0;
    $(".d-rated").each((i, star) => {
      if ($(star).attr("fill") === "#ffffff") {
        ratedStars++;
      }
    });

    if ($("#d-reviewText").val() === "") {
      $("#d-reviewErrMsg").removeClass("d-display-none");
      $("#d-reviewErrMsg").text("Fill all required fields *");
      $("#d-reviewText").addClass("wrong-format");
    } else if (!$("#d-checkBoxReview")[0].checked) {
      $("#d-reviewErrMsg").removeClass("d-display-none");
      $("#d-reviewErrMsg").text("Fill all required fields *");
      $("#d-checkBoxReview").addClass("wrong-format");
    } else {
      $("#d-reviewErrMsg").addClass("d-display-none");
      $("#d-reviewText").removeClass("wrong-format");
      $("#d-checkBoxReview").removeClass("wrong-format");

      // post reviews and ratings

      let reviewText = $("#d-reviewText").val();
      let data = {
        product_id: selectedProduct.id,
        user_id: loggedUser.id,
        text: reviewText,
      };

      $.ajax({
        url: `${endPoint}/reviews`,
        method: "POST",
        data: data,
        success: function (res) {
          console.log(res);
          location.reload(true);
        },
        error: function (err) {
          console.log(err);
        },
      });

      $(this)[0].reset();
      $("#d-createReview-Modal").addClass("d-display-none");
    }
  });

  // display product reviews
  $.ajax({
    url: `${endPoint}/reviews?product_id=${selectedProduct.id}`,
    method: "GET",
    success: function (res) {
      res.forEach((review) => {
        $.ajax({
          url: `${endPoint}/ratings?product_id=${selectedProduct.id}`,
          method: "GET",
          success: function (rating) {
            rating.forEach((item) => {
              if (item.user.id === review.user.id) {
                let productReview = $(`
                                <div class="grid-star">
                                    <div class="grid-starbox">
                                        <div class="grid-starb">
                                            <p class='d-reviewer' style="margin: 0;">${
                                              review.user.first_name
                                            }. ${review.user.last_name[0]}</p>
                                        </div>
                                        <div class="grid-starb2">
                                            <img style="height: 15px;" src="./images/check.png">
                                            <p style="margin: 0; color: #2b6df0;">Verified Reviewer</p>
                                        </div>
                                    </div>
                                    <!-- second part -->
                                    <div class="grid-staritems">
                                        <div class="grid-staritem1">
                                            <div id='d-item-review-stars'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path>
                                                </svg>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99998 13.0852L3.28889 15.4762C3.18255 15.5302 3.05189 15.4891 2.99706 15.3844C2.97577 15.3438 2.96832 15.2975 2.97581 15.2523L3.83017 10.103L0.064192 6.43136C-0.0208179 6.34848 -0.0214783 6.21346 0.062717 6.12978C0.0954128 6.09728 0.137856 6.07599 0.183781 6.06906L5.4229 5.27766L7.80648 0.617401C7.86029 0.512205 7.99054 0.469862 8.09741 0.522826C8.13891 0.543393 8.17259 0.57655 8.19349 0.617401L10.5771 5.27766L15.8162 6.06906C15.9345 6.08692 16.0156 6.19578 15.9975 6.31219C15.9904 6.3574 15.9688 6.39918 15.9358 6.43136L12.1698 10.103L13.0242 15.2523C13.0434 15.3686 12.9634 15.4782 12.8453 15.4972C12.7994 15.5045 12.7524 15.4972 12.7111 15.4762L7.99998 13.0852Z" fill="#dedede"></path>
                                                </svg>
                                            </div>
                                            <p style="margin: 0; align-items: center;">${
                                              review.created_at.split("T")[0]
                                            }</p>
                                        </div>
                                        <div>
                                            <p>${review.text}</p>
                                        </div>
                                        <div class="star-icons">
                                            <p>Was this helpful?</p>
                                            <img style="height: 15px; align-items: center; padding-top: 20px;" src="./images/like.png">
                                            <p>0</p>
                                            <img style="height: 15px; align-items: center; padding-top: 20px;" src="./images/negative-vote.png">
                                            <p>0</p>
                                        </div>
                                    </div>
                                </div>`);

                // Fill the stars based on the rating
                let productRating = productReview
                  .find("#d-item-review-stars")
                  .find("svg");
                if (item.value > 0) {
                  productRating.each((i, svg) => {
                    $(svg).find("path").css("fill", "#ef4043");
                    if (i === Math.round(item.value) - 1) {
                      return false;
                    }
                  });
                }
                $("#d-AllProductReviews").append(productReview);
              }
            });
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

  // read less and more

  $("#readMore").click(function () {
    if ($(this).text() === "Read Less") {
      $(this).text("Read More");
    } else {
      $(this).text("Read Less");
    }
    $("#productDescription-text").toggleClass("hidden");
  });
});
