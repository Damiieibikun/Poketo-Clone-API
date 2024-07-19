$(document).ready(() => {
    // create categories and products
    $('#d-add-products-admin').click(function() {
        $('#d-addProducts-list').slideToggle()
    })

    //GET /categories?merchant_id=111
    // change this
    let allCat = JSON.parse(localStorage.getItem('testing-cat')) || []
    allCat.forEach((item, i) => {
        $('#d-category-list').append(`<li class="d-dashboard-item" id=${i}>
            <a href="#" class="d-flex d-gap-10 d-align-center"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
              </svg>${item.name} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
                <div class="d-display-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                      </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
                        <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                      </svg>
                </div>
            </a>
        </li>`)

        $('#selectCategory').append(`<option value="bags">${item.name}</option>`)

    })



    // show all categories
    $('#d-dashboard-categories').click(function() {
        $('#d-category-list').slideToggle()
    })


    // add styles to selected items
    $('.d-dashboard-item').click(function() {
        $(this).css('background-color', '#0085CA')
        $(this).children().css('color', 'white')
        $(this).siblings().css('background-color', 'white')
        $(this).siblings().children().css('color', 'black')
    })

    // refresh current page when selecting dashboard
    $('#d-dashboard-heading').click(function() {
        location.reload(true)
    })

    // show edit and delete categories
    $('.bi-three-dots').click(function() {
        $(this).next().toggle()
    })

    // show edit admin modal
    $('#admin-icon-sm').click(function() {
        $('#d-modal-Admin').removeClass('d-display-none')
    })


    // // edit admin-- redirected to edit page
    // $('#d-edit-admin-btn').click(function() {
    //         $('#d-modal-Admin').addClass('d-display-none')
    //     })
        // close admin
    $('#d-close-editAdmin').click(function() {
        $('#d-modal-Admin').addClass('d-display-none')
    })

    // show add category
    $('#d-add-cat').click(function() {
        $('#d-modal-cat').removeClass('d-display-none')
    })

    // close categry

    $('#d-close-cat').click(function() {
        $('#d-modal-cat').addClass('d-display-none')
    })

    function validateCategories() {
        let validated = false
        if ($('#categoryName').val() === "") {
            $('#categoryName').addClass('wrong-format')
            $('#categoryImage').removeClass('wrong-format')
            $('#add-input-error').removeClass('d-display-none')
            $('#add-input-error').text('Empty Fields')

        } else if ($('#categoryImage').val() === "") {
            $('#categoryImage').addClass('wrong-format')
            $('#categoryName').removeClass('wrong-format')
            $('#add-input-error').removeClass('d-display-none')
            $('#add-input-error').text('Empty Fields')
        } else {
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
            urlPattern.test($('#categoryImage').val()) ?
                ($('#add-input-error').addClass('d-display-none'),
                    $('#categoryName').removeClass('wrong-format'),
                    $('#categoryImage').removeClass('wrong-format'),
                    validated = true) :
                $('#categoryImage').addClass('wrong-format'),
                $('#add-input-error').removeClass('d-display-none'),
                $('#add-input-error').text('Wrong URL format')
        }
        return validated
    }

    // create category
    $('#d-admin-form').submit(function(e) {
      e.preventDefault()
        if (validateCategories()) {
            let adminId = 123
            let imageCat = $('#categoryImage').val()
            let catName = $('#categoryName').val()

            //make post request
            let data = {
                merchant_id: adminId,
                name: catName,
                image: imageCat
            }
            let cat = JSON.parse(localStorage.getItem('testing-cat')) || [];
            cat.push(data)
            localStorage.setItem('testing-cat', JSON.stringify(cat))
            // $('#d-modal-cat').addClass('d-display-none')
            $(this)[0].reset()
            window.location.reload(true)
        }
    })

    //edit a category

    $('.bi-pen-fill').click(function() {
        $('#d-modal-cat').removeClass('d-display-none')
        $('#create-cat').text('Edit Category')


        // $('#categoryImage').val()
        // $('#categoryName').val()


        $('#d-admin-form').unbind()
        $('#d-admin-form').submit(function() {

            if (validateCategories()) {
                // let adminId = 123
                let imageCat = $('#categoryImage').val()
                let catName = $('#categoryName').val()

                //make post request
                let data = {
                    name: catName,
                    image: imageCat
                }
                console.log(data)
                $('#d-modal-cat').addClass('d-display-none')
                $(this)[0].reset()
            }


        })
    })



    // test for all prodcuts added after api call
    //GET /products?merchant_id=123
    // DESCP: Get all product for a particular merchant
    $('#d-all-products-admin').click(function() {

        $('#d-dashboard-all').removeClass('d-display-none')

        // replace with api
        let allProducts = JSON.parse(localStorage.getItem('Poketo-Products')) || []
        allProducts.forEach((item, i) => {
            $('#d-dashboard-all-items').append(
                `<div class="all-products-grid">
                <div>
                    <span>${i+1}</span>
                </div>
                <div class="d-flex d-gap-10">
                    <div class="product-img" style="background-image: url(${item.img});"></div>
                    <p class="product-name">${item.productName}</p>
                </div>
                <div>
                    <p class="product-price">$${item.price}</p>
                </div>
                <div style="justify-self: center;">
                    <p class="product-qty">${item.quantity}</p>
                </div>
                
            </div>`
            )
        });

    })

    // SAME AS ABOVE
    //GET /products?merchant_id=123&category_id=321
    //DESCP: Get all product for a particular merchant and belonging to a particular category


    // get images array
    let imagesArray = []

    $('#add-product-img').click(function() {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        if(!urlPattern.test($('#productImg').val())){
            $('#productImg').addClass('wrong-format');
            $('#add-input-error-product').text('Wrong Format');
        }
        else{
            $('#productImg').removeClass('wrong-format');
            imagesArray.push($('#productImg').val())
            $('#productImg').val('')
        }

     
    })

    function validateProducts() {

        let validated = false;
        let emptyVal = 0;

        $('#d-product-form').find('input').each((index, input) => {
            if ($(input).val() === '' && $(input).attr('id') !== 'productImg') {
                $(input).addClass('wrong-format');
                $('#add-input-error-product').removeClass('d-display-none');
                $('#add-input-error-product').text('Empty Field');
                emptyVal++;
            } else {
                $(input).removeClass('wrong-format');
            }
        });

        if (emptyVal === 0) {
            const checkInt = /^-?\d+$/;
            const checkFloat = /^-?\d+(\.\d+)?$/;

            let allValid = true;

            if (!checkFloat.test($('#productPrice').val())) {
                $('#productPrice').addClass('wrong-format');
                $('#add-input-error-product').text('Wrong Format');
                allValid = false;
            } else {
                $('#productPrice').removeClass('wrong-format');

            }

            if (!checkInt.test($('#productQTY').val())) {
                $('#productQTY').addClass('wrong-format');
                $('#add-input-error-product').text('Wrong Format');
                allValid = false;
            } else {
                $('#productQTY').removeClass('wrong-format');

            }

            if (!checkInt.test($('#min-qty').val())) {
                $('#min-qty').addClass('wrong-format');
                $('#add-input-error-product').text('Wrong Format');
                allValid = false;
            } else {
                $('#min-qty').removeClass('wrong-format');

            }

            if (!checkInt.test($('#max-qty').val())) {
                $('#max-qty').addClass('wrong-format');
                $('#add-input-error-product').text('Wrong Format');
                allValid = false;
            } else {
                $('#max-qty').removeClass('wrong-format');

            }

            if (!checkFloat.test($('#productDiscount').val())) {
                $('#productDiscount').addClass('wrong-format');
                $('#add-input-error-product').text('Wrong Format');
                allValid = false;
            } else {
                $('#productDiscount').removeClass('wrong-format');

            }
                       
            if (allValid && imagesArray.length > 0) {
                validated = true;
                $('#add-input-error-product').addClass('d-display-none');
            }
        }

        return validated;

    }

    // close a product
    $('#d-close-product').click(function() {
        $('#d-modal-product').addClass('d-display-none')
    })

    // open select product
    $('#d-select-cat').click(function(){
        $('#d-modal-chooseCat').removeClass('d-display-none')
    })

    // close select product
    $('#d-close-Selectcat').click(function(){
        $('#d-modal-chooseCat').addClass('d-display-none')
    })
    // open product modal
    $('#d-add-product').click(function() {
        $('#d-modal-product').removeClass('d-display-none')
    })

    // create variations data for local stroage

    let contentsArr = []

    // push each variation created to content
    $('#d-add-variation-btn').click(function() {
        let contentObj = {
            display: [{
                type: $('#variation-display').val(),
                value: $('#variation-entry').val()
            }],
            text: $('#variation-text').val()
        }

        contentsArr.push(contentObj)
    })

    // close a variation
    $('#d-close-variations').click(function() {
        $('#d-modal-variations').addClass('d-display-none')
        let variationArr = JSON.parse(localStorage.getItem('createdVariations')) || [];
        let variationObjItem = {
            type: $('#variation-type').val(),
            text: $('#variation-type').val(),
            content: contentsArr
        }

        variationArr.push(variationObjItem)
        console.log(variationArr)
        localStorage.setItem('createdVariations', JSON.stringify(variationArr))
            // location.reload(true)
    })

    //show variation options
    $('#productVariations').click(function() {
        if (this.checked) {
            $('#show-variations').removeClass('d-display-none')
        }
    })

    $('#variation-type').change(function() {
        console.log($(this).val())
        $('#d-modal-variations').removeClass('d-display-none')
    })


    $('#d-product-form').submit(function(e) {
        e.preventDefault()
        console.log(validateProducts())
        if (validateProducts()) {
            console.log(imagesArray)
                // get variations
                // do something
        }



    })

    // create a category
    // "attrib": [{
    //         "type": "Other",
    //         "content": [{
    //                 "name": "Place of Origin",
    //                 "value": "Fujian, China"
    //             },
    //             {
    //                 "name": "Brand Name",
    //                 "value": "Ts-013"
    //             },
    //             {
    //                 "name": "Midsole Material",
    //                 "value": "PVC"
    //             },
    //             {
    //                 "name": "Season",
    //                 "value": "Winter, Summer, Spring, Autumm"
    //             },
    //             {
    //                 "name": "Gender",
    //                 "value": "Men"
    //             }
    //         ]
    //     },
    //     {
    //         "type": "Supply Ability",
    //         "content": [{
    //             "name": "Supply Ability",
    //             "value": "1000 Box/Boxes per Month"
    //         }]
    //     }
    // ],
})