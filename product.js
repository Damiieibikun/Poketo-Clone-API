$(document).ready(() => {
    //get 4 items
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    let merchant = JSON.parse(localStorage.getItem('Merchant-Poketo'))
    let loggedUser = JSON.parse(localStorage.getItem('LoggedUser'))
    $.ajax({
        url: `${endPoint}/products?merchant_id=${merchant.id}`,
        method: 'GET',
        success: function(res) {
            let otherItems = res.data.splice(0, 4)
            console.log(otherItems)
            otherItems.forEach(product => {

                var itemProduct = {}

                if (product.review === 0 && product.total_sold === 0) {
                    var itemProduct = {
                        tag: 'New!',
                        tagColor: '#73ccf3',
                    }
                } else if (product.rating > 4 && product.like > 0) {
                    var itemProduct = {
                        tag: 'Best Seller',
                        tagColor: '#ffc845',
                    }
                }
                let showStars = 'flex'
                if (product.quantity === null) {
                    showStars = 'none'
                }

                $('.grid-2jen').append(`<div class="d-grid">
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
                            <span class="d-slider-product-rating">${product.rating} <span class='d-quantity-avail'>(${product.quantity})</span></span>
                        </div>
                        <p class="d-slider-product-price">$${product.price}</p>
                    </div>
                    
                    <div class="d-product-colors d-flex d-gap-10">

                    </div>
                </div>
            </div>`)
            })
        },
        error: function(err) {
            console.log(err)
        }
    })

    // get selected item
    let selectedProduct = JSON.parse(localStorage.getItem('Selected-Product'))
    $.ajax({
        url: `${endPoint}/products/${selectedProduct.id}`,
        method: 'GET',
        success: function(res) {
            console.log(res)
            let showStars = 'flex'
            if (res.quantity === null) {
                showStars = 'none'
            }
         
            $('.jenny-item ').css('background-image', `url(${res.images[0]})`)
        
            // check likes, ratings and reviews
            var selectedProductTag = {}
        
            if (res.review === 0 && res.total_sold === 0) {
                var selectedProductTag = {
                    tag: 'New!',
                    tagColor: '#73ccf3',
                }
            } else if (res.rating > 4 && res.like > 0) {
                var selectedProductTag = {
                    tag: 'Best Seller',
                    tagColor: '#ffc845',
                }
            }
        
                 
            $('#j-selectedProduct-info').html(
                ` <div data-id = ${res.id}>
                <div class="mustard d-align-center" style="background-color: ${selectedProductTag.tagColor};">
                  <p>${selectedProductTag.tag}</p>
            
              </div>
              <div class= "d-flex d-gap-10 d-align-center d-justify-between">
              <h1>${res.title}</h1> 
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#dedede" class="bi bi-heart-fill" viewBox="0 0 16 16"  id="like-Product" data-id = ${res.id}>
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
        
              </div>
              
        
              <div class="jenny-flex">
              
                  <h3>$${res.price}</h3>
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
                        <span style = "display: ${showStars}" class="d-slider-product-rating">${res.rating}(${res.quantity})</span>
                  </div>
                        
                   
              </div>
              <!-- <p>color:blue</p> -->
              <div class="jenny-icons d-product-colors">
                    <!-- available colors -->
        
              </div>
              <div class="jenny-b">
                  <p style="color: #0085ca;">Free Returns & Free Shipping over $50</p>
              </div>
              </div>
              `)
        
            $('#productDescription-text').html(`${res.descp}`)
        
        
        
            if (res.has_shipment) {
                $('#shippingLocDetails').show();
                res.shipping_locations.forEach(item => {
                    $('#shippingLocDetails').append(`<p>${item}</p>`)
                })
            } else {
                $('#shippingLocDetails').show();
                $('#shippingLocDetails').html(`<p>We current are not shipping this item</p>`);
            }
        
            if (res.has_refund_policy) {
                $('#refundDetailsAvail').show()
            } else {
                $('#refundDetailsAvail').show()
                $('#shippingLocDetails').html(`<p>We current dont offer refund for this item</p>`);
            }
        
            $(".none").html(`${res.descp}`)
        
        
        
            let productRating = $('#j-selectedProduct-info').find('.star').find('svg')
            if (res.rating > 0) {
                productRating.each((i, svg) => {
                    $(svg).find('path').css('fill', '#ef4043')
                    if (i === Math.round(res.rating) - 1) {
                        return false;
                    }
                })
            }
        
            if ('availableImage' in res) {
                res.availableImage.forEach((img, i) => {
                    $('#j-selectedProduct-info').find('.d-product-colors').append(` < div class = "d-color-selection-outer" >
                        <
                        div class = "d-color-selection"
                    data - id = $ { i }
                    " style="
                    background - image: url($ { img });
                    background - color: transparent "></div> < /
                        div > `)
                })
            }
            if ('availableColors' in res) {
                res.availableColors.forEach((color, i) => {
                    $('#j-selectedProduct-info').find('.d-product-colors').append(` < div class = "d-color-selection-outer" >
                        <
                        div class = "d-color-selection"
                    data - id = $ { i }
                    " style="
                    background - image: url('');
                    background - color: $ { color }
                    "></div> <
                    /div>`)
                })
            }
        },
        error: function(err){
            console.log(err)
        }
    })

    // get all products liked by a user and compare

    $.ajax({
        url:`${endPoint}/users/likes?user_id=${loggedUser.id}`,
        method: 'GET',
        success: function(res){
  
                res.forEach((element) => {
                    // let productInfo = element.product_id
                    // if(productInfo._id === $('#like-Product').data('id')){
                    //     console.log(true)
                    //     $('#like-Product').addClass('liked-product')
                    // }   
                    
                    const productId = element.product_id._id;
                        $(`[data-id='${productId}'] #like-Product`).addClass('liked-product');
                });
            
          
        },
        error: function(err){
            console.log(err)
        }
        })
   

    $(document).on('click', '.d-slider-product-item', function() {
        let selectedId = $(this).data('id');
        $.ajax({
            url: `${endPoint}/products/${selectedId}`,
            method: 'GET',
            success: function(res) {
                localStorage.setItem('Selected-Product', JSON.stringify(res))
                window.location.href = 'product.html'
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

    $(document).on('mouseover', '.d-slider-product-item', function() {
        $(this).find('.d-addCart').show()
    })

    $(document).on('mouseout', '.d-slider-product-item', function() {
        $(this).find('.d-addCart').hide()
    })

    // like a product
    $(document).on('click', '#like-Product', function(){
        let selectedId = $(this).data('id');
        $(this).toggleClass('liked-product')
        if($(this).hasClass('liked-product')){
            $.ajax({
                url: `${endPoint}/likes`,
                method: 'POST',
                data:{
                    product_id: selectedId,
                    user_id: loggedUser.id
                },
                success: function(res){
                    console.log(res)
                    location.reload(true)
                },
                error: function(err){
                    console.log(err)
                }

            })
        }
        else{
            $.ajax({
                url: `${endPoint}/likes`,
                method: 'DELETE',
                data:{
                    product_id: selectedId,
                    user_id: loggedUser.id
                },
                success: function(res){
                    console.log(res)
                    location.reload(true)
                },
                error: function(err){
                    console.log(err)
                }

            }) 
        }
    })



    $("#add1").click(function() {
        $(".none").show();
        $('#minus1').show()
        $(this).hide()

    });

    $("#add2").click(function() {

        $(".none2").show();
        $('#minus2').show()
        $(this).hide()
    })

    $("#minus1").click(function() {
        $(".none").hide();
        $('#add1').show()
        $(this).hide()

    });

    $("#minus2").click(function() {

        $(".none2").hide();
        $('#add2').show()
        $(this).hide()
    })


    $("#add2").click(function() {
        $(".butter2").css("border-bottom", "none");
    });

})

