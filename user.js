$(document).ready(() => {
  const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  let userDetails = JSON.parse(localStorage.getItem("LoggedUser"));

  $("#d-userBioDetails").html(`
    <span>${userDetails.first_name}</span> <span>${userDetails.last_name}</span>
    <p>${userDetails.email}</p>
    <p>${userDetails.phone}</p>
    `);

    // get customer's likes
  $.ajax({
    url: `${endPoint}/users/likes?user_id=${userDetails.id}`,
    method: "GET",
    success: function (res) {
      if (res.length > 0) {
        $("#no-likes").addClass("d-display-none");
        res.forEach((element, i) => {
          let productInfo = element.product_id;

          $("#user-order-likes")
            .append(`<div class="d-flex d-align-center d-gap-20">
                                <!-- <span>${i + 1}</span> -->
                                <div class="d-likedProductIMG" style=" background-image: url(${
                                  productInfo.images[0]
                                });"></div>
                                <p class="d-likedProductName">${
                                  productInfo.title
                                }</p>
                               
                                <p class="d-numofLikes"></p>
                             </div>`);
        });
      } else {
        $("#no-likes").removeClass("d-display-none");
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  // customer's reviews
  $.ajax({
    url: `${endPoint}/users/reviews?user_id=${userDetails.id}`,
    method: "GET",
    success: function (res) {
      if (res.length > 0) {
        $("#no-reviews").addClass("d-display-none");
        console.log(res);
        res.forEach((review) => {
          $.ajax({
            url: `${endPoint}/ratings?product_id=${review.product_id._id}`,
            method: "GET",
            success: function (rating) {
              rating.forEach((item) => {
                if (item.user.id === userDetails.id) {
                  let productReview =
                    $(`<div class="d-grid d-align-center d-gap-20 d-customer-reviewItems-grid">
                    <div>
                     <p class="d-likedProductName">${review.product_id.title}</p>
                    <div class="d-likedProductIMG" style=" background-image: url(${review.product_id.images[0]});"></div>
                                   
                    </div>
                                    
                                    <div class="d-flex-col">
                                     <b>Review:</b>
                                    <p class='customerReview'>${review.text}</p>

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
                                    </div>

                                    <div class="d-flex d-gap-10" data-id=${review._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16" data-id = ${review.product_id._id}>
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                      </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16" data-id = ${review.product_id._id}>
                        <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                      </svg>
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
                  $("#user-order-reviews").append(productReview);
                }
              });
            },
            error: function (err) {
              console.log(err);
            },
          });
        });
      } else {
        $("#no-reviews").removeClass("d-display-none");
      }
    },
    error: function (err) {
      console.log(err);
    },
  });


  // get customer's orders
  let cartItems = JSON.parse(localStorage.getItem('CurrentUser-cartItems')) 
  if (cartItems !== null){
    cartItems.forEach(user =>{
if(user.user_id === userDetails.id){
  if(user.cartItems.length > 0){
    $("#no-orders").addClass("d-display-none");
    let total = 0
    user.cartItems.forEach(product =>{
      let productID = product.itemId
      total += (product.quantity * product.price)
      // console.log(productID)
      $.ajax({
        url: `${endPoint}/products/${productID}`,
        method: 'GET',
        success: function(res){
          console.log(res)
$('#user-order-historyInfo').append(
  `<div class="d-grid d-align-center d-gap-20 d-listOrders">
  <div class="d-flex-col d-gap-10">
    <div class="d-likedProductIMG" style="background-image: url(${res.images[0]})"></div>
    <p class="d-orderedProductName">${res.title}</p>
  </div>                               
 
  <p class="d-qtyOrdered"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg> ${product.quantity}</p>
  <b class="d-priceItem">$${product.price}</b>
</div>`
)
        },
        error: function(err){
          console.log(err)
        }
      })
    })

    $('#d-TotalOrders').text(`Total: $${total}`)
    // console.log(total)
   
  }
}
    })
  }














//   edit reviews and ratings
let valuesRating = ["Very poor", "Poor", "Average", "Good", "Great!"];
$(document).on("click", ".bi-pen-fill", function() {
    $("#d-createReview-Modal").removeClass("d-display-none");
    $("#sendReviewRating").text("Edit Review");
    let productID = $(this).data('id')
    let reviewID = $(this).parent().data('id')
     // ratings 
  $(".d-rated").click(function () {
    $(this).addClass("fillRed");
    $(this).prevAll().addClass("fillRed");
    $(this).nextAll().removeClass("fillRed");
    let starID = $(this).data("id");
    console.log(starID);
    $("#d-ratingValue").text(valuesRating[starID - 1]);
    let data = {
      product_id: productID,
      user_id: userDetails.id,
      text: valuesRating[starID - 1],
      value: starID,
    };  

    $.ajax({
      url: `${endPoint}/ratings`,
      method: "PUT",
      data: data,
      success: function (res) {
        console.log(res);
        // location.reload(true)
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  // reviews
     $("#d-review-From").submit(function (e) {
        e.preventDefault();

  if($("#d-reviewText").val() === ''){
      $('#d-reviewErrMsg').removeClass('d-display-none')
      $('#d-reviewErrMsg').text('Fill all required fields *')
      $('#d-reviewText').addClass('wrong-format')
    }
    else if(!$('#d-checkBoxReview')[0].checked){
      $('#d-reviewErrMsg').removeClass('d-display-none')
      $('#d-reviewErrMsg').text('Fill all required fields *')
      $('#d-checkBoxReview').addClass('wrong-format')
    }
    
    else{
      $('#d-reviewErrMsg').addClass('d-display-none')
      $('#d-reviewText').removeClass('wrong-format')
      $('#d-checkBoxReview').removeClass('wrong-format')

      // Edit reviews and ratings
    
        let reviewText = $("#d-reviewText").val();
        let data = {
          user_id: userDetails.id,
          text: reviewText,
        };
        console.log(data)
    
        $.ajax({
          url: `${endPoint}/reviews/${reviewID}`,
          method: "PUT",
          data: data,
          success: function (res) {
            console.log(res);
            location.reload(true)
          },
          error: function (err) {
            console.log(err);
          },
        });
    
        $(this)[0].reset();
        $("#d-createReview-Modal").addClass("d-display-none");

    }
    
      









      });
})

  // close reviews modal
  $("#d-closeReviews").click(function () {
    $("#d-createReview-Modal").addClass("d-display-none");
  });


// delete reviews and ratings

$(document).on("click", ".bi-trash2-fill", function() {
    $("#d-deleteReview-Modal").removeClass("d-display-none");
    let productID = $(this).data('id')
    let reviewID = $(this).parent().data('id')
    $('#d-deleteCustomerRating').click(function(){
        let data = {
            product_id: productID,
            user_id: userDetails.id            
          }; 
          $.ajax({
            url: `${endPoint}/ratings`,
            method: 'DELETE',
            data: data,
            success: function (res) {
                console.log(res)
                alert('Rating Deleted Successfully')
                location.reload(true)
            },
            error: function (err) {
                console.log(err)
            }
          })
    })

    $('#d-deleteCustomerReview').click(function(){
        let data = {
            review_id: reviewID,
            user_id: userDetails.id            
          }; 
          $.ajax({
            url: `${endPoint}/reviews`,
            method: 'DELETE',
            data: data,
            success: function (res) {
                console.log(res)
                alert('Review Deleted Successfully')
                location.reload(true)
            },
            error: function (err) {
                console.log(err)
            }
          })
    })
})

  // close delete reviews modal
  $("#d-closedeleteReviews").click(function () {
    $("#d-deleteReview-Modal").addClass("d-display-none");
  });














  //remove logged users details
  $("#d-userslogout-link").click(function () {
    localStorage.removeItem("LoggedUser");
    localStorage.removeItem("Selected-Product");
  });
});
