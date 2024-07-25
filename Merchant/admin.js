$(document).ready(() => {
    // get endpoint
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    // get logged in merchant
    let merchant = JSON.parse(localStorage.getItem("Merchant-Poketo"));
    $("#admin-icon-sm").css("background-image", `url(${merchant.icon})`);
    $("#admin-icon-lg").css("background-image", `url(${merchant.icon})`);
    $(".admin-Name").text(`${merchant.first_name}`);

    //admin popup
    $("#d-modaladmin-fname").text(`${merchant.first_name}`);
    $("#d-modaladmin-lname").text(`${merchant.last_name}`);
    $("#d-modaladmin-email").text(`${merchant.email}`);
    $("#d-modaladmin-shopName").text(`${merchant.store_name}`);
    $("#d-modaladmin-Desc").text(`${merchant.descp}`);

    // create categories and products
    $("#d-add-products-admin").click(function() {
        $("#d-addProducts-list").slideToggle();
    });

    //GET categories
    $.ajax({
        url: `${endPoint}/categories?merchant_id=${merchant.id}`,
        method: "GET",
        success: function(data) {
            let allCat = data;
            allCat.forEach((item) => {
                $("#d-category-list")
                    .append(`<li class="d-dashboard-item d-category-item" data-id=${item.id}>
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
        </li>`);

                $("#selectCategory").append(
                    `<option value="${item.name}" data-id=${item.id}>${item.name}</option>`
                );
            });
        },
        error: function(err) {},
    });

    // show all categories
    $("#d-dashboard-categories").click(function() {
        $("#d-category-list").slideToggle();
    });

    // add styles to selected items
    $(".d-dashboard-item").click(function() {
        $(this).css("background-color", "#0085CA");
        $(this).children().css("color", "white");
        $(this).siblings().css("background-color", "white");
        $(this).siblings().children().css("color", "black");
    });

    // refresh current page when selecting dashboard
    $("#d-dashboard-heading").click(function() {
        location.reload(true);
    });

    // show edit and delete categories
    $(document).on("click", ".bi-three-dots", function() {
        $(this).next().toggle();
    });

    // show edit admin modal
    $("#admin-icon-sm").click(function() {
        $("#d-modal-Admin").removeClass("d-display-none");
    });

    // close admin
    $("#d-close-editAdmin").click(function() {
        $("#d-modal-Admin").addClass("d-display-none");
    });

    // show add category
    $("#d-add-cat").click(function() {
        $("#d-modal-cat").removeClass("d-display-none");
    });

    // close categry

    $("#d-close-cat").click(function() {
        $("#d-modal-cat").addClass("d-display-none");
        $("#categoryName").removeClass("wrong-format");
        $("#categoryImage").removeClass("wrong-format");
        $("#add-input-error").addClass("d-display-none");
        $("#d-admin-form")[0].reset();
    });

    function validateCategories() {
        let validated = false;
        if ($("#categoryName").val() === "") {
            $("#categoryName").addClass("wrong-format");
            $("#categoryImage").removeClass("wrong-format");
            $("#add-input-error").removeClass("d-display-none");
            $("#add-input-error").text("Empty Fields");
        } else if ($("#categoryImage").val() === "") {
            $("#categoryImage").addClass("wrong-format");
            $("#categoryName").removeClass("wrong-format");
            $("#add-input-error").removeClass("d-display-none");
            $("#add-input-error").text("Empty Fields");
        } else {
            const urlPattern =
                /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
            urlPattern.test($("#categoryImage").val()) ?
                ($("#add-input-error").addClass("d-display-none"),
                    $("#categoryName").removeClass("wrong-format"),
                    $("#categoryImage").removeClass("wrong-format"),
                    (validated = true)) :
                $("#categoryImage").addClass("wrong-format"),
                $("#add-input-error").removeClass("d-display-none"),
                $("#add-input-error").text("Wrong URL format");
        }
        return validated;
    }

    // create category
    $("#d-admin-form").submit(function(e) {
        e.preventDefault();
        if (validateCategories()) {
            $("#add-input-error").addClass("d-display-none")
            let adminId = merchant.id;
            let imageCat = $("#categoryImage").val();
            let catName = $("#categoryName").val();

            //make post request
            let data = {
                merchant_id: adminId,
                name: catName,
                image: imageCat,
            };

            $.ajax({
                url: `${endPoint}/categories`,
                data: data,
                method: "POST",
                success: function(res) {
                    console.log(res);
                    location.reload(true);
                },
                error: function(res) {},
            });

            $(this)[0].reset();
            // window.location.reload(true);
        }
    });

    //edit a category

    $(document).on("click", ".bi-pen-fill", function() {
        $("#d-modal-cat").removeClass("d-display-none");
        $("#create-cat").text("Edit Category");
        let catID = $(this).parents("li").data("id");
        // $('#categoryImage').val()

        $("#d-admin-form").unbind();
        $("#d-admin-form").submit(function(e) {
            e.preventDefault();

            if (validateCategories()) {
                let imageCat = $("#categoryImage").val();
                let catName = $("#categoryName").val();

                let data = {
                    name: catName,
                    image: imageCat,
                };

                $.ajax({
                    url: `${endPoint}/categories/${catID}`,
                    data: data,
                    method: "PUT",
                    success: function(res) {
                        location.reload(true);
                    },
                    error: function(res) {},
                });

                $(this)[0].reset();
            }
        });
    });

    // delete a category

    $(document).on('click', '.bi-trash2-fill', function() {
        let catID = $(this).parents("li").data("id");

        $.ajax({
            url: `${endPoint}/categories/${catID}`,
            method: 'DELETE',
            success: function(res) {
                console.log(res)
                alert('Deleted Successfully!')
                location.reload(true)
            },
            error: function(err) {
                console.log(err)
            }
        })
    })

    // get all items in stock


    $.ajax({
        url: `${endPoint}/products?merchant_id=${merchant.id}&limit=20`,
        method: "GET",
        success: function(res) {
            let allProducts = res.data
            let itemsInStock = 0
            allProducts.forEach((item) => {
                itemsInStock += item.quantity
            });
            $('#d-total-stock').text(`${itemsInStock}`)

        },
        error: function(err) {}
    })




    // Get all product for a particular merchant

    $("#d-all-products-admin").click(function() {
        $("#d-dashboard-all").removeClass("d-display-none");
        $('#d-dashboardTitle').text('All Products')


        $.ajax({
            url: `${endPoint}/products?merchant_id=${merchant.id}&limit=20`,
            method: "GET",
            success: function(res) {

                let allProducts = res.data
                console.log(allProducts)
                let itemsInStock = 0
                $("#d-dashboard-all-items").empty()
                allProducts.forEach((item, i) => {
                    $("#d-dashboard-all-items").append(
                        `<div class="all-products-grid">
                            <div>
                                <span>${i+1}</span>
                            </div>
                            <div class="d-flex d-gap-10">
                                <div class="product-img" style="background-image: url(${
                                  item.image
                                });"></div>
                                <p class="product-name">${item.title}</p>
                            </div>
                            <div>
                                <p class="product-price">$${item.price}</p>
                            </div>
                            <div style="justify-self: center;">
                                <p class="product-qty">${item.quantity}</p>
                            </div>
                            
                        </div>`
                    );

                    itemsInStock += item.quantity
                });

                console.log(itemsInStock)
            },
            error: function(err) {}
        })

    });



    //  Get all product for a particular merchant and belonging to a particular category

    $(document).on('click', '.d-category-item', function() {
        let catID = $(this).data('id')
        $("#d-dashboard-all").removeClass("d-display-none");
        $('#d-dashboardTitle').text(`${$(this).find('a').text()}`)
        $.ajax({
            url: `${endPoint}/products?merchant_id=${merchant.id}&category_id=${catID}`,
            method: 'GET',
            success: function(res) {
                $("#d-dashboard-all-items").empty()
                    // console.log(res.data)
                let allProducts = res.data
                if (allProducts.length === 0) {
                    $('.all-products-grid').hide()
                    $("#d-dashboard-all-items").html(`<h1>No items in this category</h1>`)
                } else {
                    $('.all-products-grid').show()
                    allProducts.forEach((item, i) => {

                        $("#d-dashboard-all-items").append(
                            `<div class="all-products-grid">
                                <div>
                                    <span>${i+1}</span>
                                </div>
                                <div class="d-flex d-gap-10">
                                    <div class="product-img" style="background-image: url(${
                                      item.image
                                    });"></div>
                                    <p class="product-name">${item.title}</p>
                                </div>
                                <div>
                                    <p class="product-price">$${item.price}</p>
                                </div>
                                <div style="justify-self: center;">
                                    <p class="product-qty">${item.quantity}</p>
                                </div>
                                
                            </div>`
                        );
                    });
                }


            },
            error: function(err) {
                console.log(err)
            }
        })
    })


    //open add images modal

    $("#add-Images").click(function() {
        $("#d-modal-addImages").removeClass("d-display-none");
    });
    // close add images modal

    $("#d-close-addImages").click(function() {
        $("#d-modal-addImages").addClass("d-display-none");
        $("#productImg").removeClass("wrong-format");
        $("#img-input-error").addClass("d-display-none");
    });

    $("#add-product-img").click(function() {
        const urlPattern =
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
        if (!urlPattern.test($("#productImg").val())) {
            $("#productImg").addClass("wrong-format");
            $("#img-input-error").removeClass("d-display-none");
            $("#img-input-error").text("Wrong Format");
        } else {
            $("#productImg").removeClass("wrong-format");
            $("#img-input-error").addClass("d-display-none");
            // get images array
            let imagesArray = JSON.parse(localStorage.getItem("imagesArr")) || [];

            imagesArray.push($("#productImg").val());
            localStorage.setItem("imagesArr", JSON.stringify(imagesArray));
            $("#productImg").val("");
            $("#images-input-success").show().delay(2000).fadeOut();
            $("#images-input-success").text("Image Added Successfully!");
        }
    });

    function validateProducts() {
        // let imagesArray = JSON.parse(localStorage.getItem('imagesArr')) || []
        let validated = false;
        let emptyVal = 0;

        $("#d-product-form")
            .find("input")
            .each((index, input) => {
                if ($(input).val() === "" && $(input).attr("id") !== "productImg") {
                    $(input).addClass("wrong-format");
                    $("#add-input-error-product").removeClass("d-display-none");
                    $("#add-input-error-product").text("Empty Field");
                    emptyVal++;
                } else {
                    $(input).removeClass("wrong-format");
                }
            });

        if (emptyVal === 0) {
            const checkInt = /^-?\d+$/;
            const checkFloat = /^-?\d+(\.\d+)?$/;

            let allValid = true;

            if (!checkFloat.test($("#productPrice").val())) {
                $("#productPrice").addClass("wrong-format");
                $("#add-input-error-product").text("Wrong Format");
                allValid = false;
            } else {
                $("#productPrice").removeClass("wrong-format");
            }

            if (!checkInt.test($("#productQTY").val())) {
                $("#productQTY").addClass("wrong-format");
                $("#add-input-error-product").text("Wrong Format");
                allValid = false;
            } else {
                $("#productQTY").removeClass("wrong-format");
            }

            if (!checkInt.test($("#min-qty").val())) {
                $("#min-qty").addClass("wrong-format");
                $("#add-input-error-product").text("Wrong Format");
                allValid = false;
            } else {
                $("#min-qty").removeClass("wrong-format");
            }

            if (!checkInt.test($("#max-qty").val())) {
                $("#max-qty").addClass("wrong-format");
                $("#add-input-error-product").text("Wrong Format");
                allValid = false;
            } else {
                $("#max-qty").removeClass("wrong-format");
            }

            if (!checkFloat.test($("#productDiscount").val())) {
                $("#productDiscount").addClass("wrong-format");
                $("#add-input-error-product").text("Wrong Format");
                allValid = false;
            } else {
                $("#productDiscount").removeClass("wrong-format");
            }

            if (allValid) {
                validated = true;
                $("#add-input-error-product").addClass("d-display-none");
            }
        }

        return validated;
    }

    // close a product
    $("#d-close-product").click(function() {
        $("#d-modal-product").addClass("d-display-none");
        $("#d-product-form input").removeClass("wrong-format");
        $("#add-input-error-product").addClass("d-display-none");
    });

    // open select product
    $("#d-select-cat").click(function() {
        $("#d-modal-chooseCat").removeClass("d-display-none");
    });

    // close select product
    $("#d-close-Selectcat").click(function() {
        $("#d-modal-chooseCat").addClass("d-display-none");
        $("#select-input-error").addClass("d-display-none");
        $("#selectCategory").removeClass("wrong-format");
        $("#d-chooseCat-form")[0].reset();
    });

    // select category for product
    $("#d-chooseCat-form").submit(function(e) {
        e.preventDefault();
        if ($("#selectCategory").val() === "") {
            $("#select-input-error").removeClass("d-display-none");
            $("#selectCategory").addClass("wrong-format");
            $("#select-input-error").text("Select a category");
        } else {
            $("#select-input-error").addClass("d-display-none");
            $("#selectCategory").removeClass("wrong-format");
            let catId = $("#selectCategory").children(":selected").data("id");
            localStorage.setItem("ChosenCategory-product", catId);
            $("#d-modal-product").removeClass("d-display-none");
            $("#d-modal-chooseCat").addClass("d-display-none");
            $(this)[0].reset();
        }
    });

    // add event listener to variation display selection

    $("#variation-display").change(function() {

        if ($('#variation-type').val() === 'color') {
            if ($(this).val() === "text") {
                $("#variation-entryID").text("Choose a Color");
                $("#variation-entry")
                    .attr({ type: "color", value: "#000000" })
                    .css("width", "60px");
            } else if ($(this).val() === "image") {
                $("#variation-entryID").text("Enter Image URL");
                $("#variation-entry")
                    .attr({ type: "text", placeholder: "https://www." })
                    .css("width", "100%");
                $("#variation-entry").val("");
            } else {
                $("#variation-entryID").text("");
                $("#variation-entry")
                    .attr({ type: "text", placeholder: "" })
                    .css("width", "0%");
            }
        } else if ($('#variation-type').val() === 'size') {
            if ($(this).val() === "text") {
                $("#variation-entryID").text("Enter a Size");
                $("#variation-entry")
                    .attr({ type: "text", placeholder: "" })
                    .css("width", "100%");
            } else if ($(this).val() === "image") {
                $("#variation-entryID").text("Enter Image URL");
                $("#variation-entry")
                    .attr({ type: "text", placeholder: "https://www." })
                    .css("width", "100%");
                $("#variation-entry").val("");
            } else {
                $("#variation-entryID").text("");
                $("#variation-entry")
                    .attr({ type: "text", placeholder: "" })
                    .css("width", "0%");
            }
        }

    });

    //exit variation modal
    $('#exit-variation-modal').click(function() {
        $("#d-modal-variations").addClass("d-display-none");
        $('#d-modal-variations-details')[0].reset()
    })


    // push each variation created to content
    $("#d-add-variation-btn").click(function() {
        const urlPattern =
            /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

        $("#variation-display").removeClass("wrong-format");
        $("#variation-entry").removeClass("wrong-format");
        $("#variation-text").removeClass("wrong-format");
        $("#variations-input-error").addClass("d-display-none");

        if ($("#variation-display").val() === "") {
            $("#variation-display").addClass("wrong-format");
            $("#variations-input-error").removeClass("d-display-none");
            $("#variations-input-error").text("Empty Field");
        } else if ($("#variation-entry").val() === "") {
            $("#variation-entry").addClass("wrong-format");
            $("#variations-input-error").removeClass("d-display-none");
            $("#variations-input-error").text("Empty Field");
        } else if ($("#variation-text").val() === "") {
            $("#variation-text").addClass("wrong-format");
            $("#variations-input-error").removeClass("d-display-none");
            $("#variations-input-error").text("Empty Field");
        } else if (
            $("#variation-display").val() === "image" &&
            !urlPattern.test($("#variation-entry").val())
        ) {

            $("#variation-entry").addClass("wrong-format");
            $("#variations-input-error").removeClass("d-display-none");
            $("#variations-input-error").text("Invalid URL Format");
        } else {
            $("#variation-entry").removeClass("wrong-format");
            $("#variations-input-error").addClass("d-display-none");
            $("#variations-input-error").text("");

            // create variations data for local stroage
            let contentsArr =
                JSON.parse(localStorage.getItem("Contents-Array")) || [];

            let contentObj = {
                display: [{
                    type: $("#variation-display").val(),
                    value: $("#variation-entry").val(),
                }, ],
                text: $("#variation-text").val(),
            };

            contentsArr.push(contentObj);
            localStorage.setItem("Contents-Array", JSON.stringify(contentsArr));
            $("#variations-input-success").show().delay(2000).fadeOut();
            $("#variations-input-success").text("Variation Added Successfully!");
            $("#variation-entry").val("");
            $("#variation-text").val("");
        }
    });

    // upload a variation
    $("#d-close-variations").click(function() {

        let variationArr =
            JSON.parse(localStorage.getItem("createdVariations")) || [];
        let contentsArr = JSON.parse(localStorage.getItem("Contents-Array")) || [];


        if (contentsArr.length === 0) {

            $("#variations-input-error").removeClass('d-display-none')
            $("#variations-input-error").text(
                "Please fill all required fields properly and add variation"
            );
        } else {
            let variationObjItem = {
                type: $("#variation-type").val(),
                text: $("#variation-type").val(),
                content: contentsArr,
            };

            variationArr.push(variationObjItem);

            localStorage.setItem("createdVariations", JSON.stringify(variationArr));

            // location.reload(true)
            $("#d-modal-variations").addClass("d-display-none");
            $('#d-modal-variations-details')[0].reset()
        }
    });

    //show variation options
    $("#productVariations").click(function() {
        if (this.checked) {
            $("#show-variations").removeClass("d-display-none");
        } else {
            $("#show-variations").addClass("d-display-none");
        }
    });

    $("#variation-type").change(function() {
        $("#variation-entryID").text("");
        $("#variation-entry")
            .attr({ type: "text", placeholder: "" })
            .css("width", "0%");
        $("#d-modal-variations").removeClass("d-display-none");
        localStorage.removeItem('Contents-Array')

    });


    // set min date for discount to be today

    const today = new Date().toISOString().slice(0, 10)
    let date = $('#productDiscountEx')
    date.attr('min', `${today}`)


    $("#d-product-form").submit(function(e) {
        e.preventDefault();
        console.log(validateProducts());
        if (validateProducts()) {
            let chosenCatId = localStorage.getItem('ChosenCategory-product')
            let title = $("#productTitle").val();
            let desc = $("#productDesc").val();
            let price = $("#productPrice").val();
            let brand = $("#productBrand").val();
            let quantity = $("#productQTY").val();
            // get array for images
            let images = JSON.parse(localStorage.getItem("imagesArr")) || [];
            let currency = $("#productCurrency").val();
            let minQty = $("#min-qty").val();
            let maxQty = $("#max-qty").val();
            let discount = $("#productDiscount").val();
            let discountExp = $("#productDiscountEx").val();
            let refund = $("#productRefund")[0].checked;
            let discountAvail = $("#productDiscounted")[0].checked;
            let shiping = $("#productShipment")[0].checked;
            let variations = $("#productVariations")[0].checked;
            // get shipping locations
            let shippingLoc = JSON.parse(localStorage.getItem('locationArray')) || []
            let attr = [];
            // get variations info
            let variationInfo =
                JSON.parse(localStorage.getItem("createdVariations")) || [];


            let productData = {
                title: title,
                descp: desc,
                price: price,
                brand: brand,
                quantity: quantity,
                images: images,
                currency: currency,
                min_qty: minQty,
                max_qty: maxQty,
                discount: discount,
                discount_expiration: discountExp,
                has_refund_policy: refund,
                has_discount: discountAvail,
                has_shipment: shiping,
                has_variation: variations,
                shipping_locations: shippingLoc,
                attrib: attr,
                category_id: chosenCatId,
                merchant_id: merchant.id
            }

            if (variations) {
                productData.variations = variationInfo;
            }


            // console.log(productData)
            $.ajax({
                url: `${endPoint}/products`,
                data: productData,
                method: "POST",
                success: function(res) {
                    console.log(res)
                    location.reload(true)
                },
                error: function(err) {
                    console.log(err)
                }
            })


            // clear images array
            localStorage.removeItem('imagesArr')

            // clear contents array
            localStorage.removeItem('Contents-Array')
                // clear variations local storage
            localStorage.removeItem('createdVariations')
                // clear locations
            localStorage.removeItem('locationArray')
                // clear category id
            localStorage.removeItem('ChosenCategory-product')
                // reset form

            $(this)[0].reset()
                // location.reload(true)
        }
    });

    // open shipping locations
    $("#add-shiping-location").click(function() {
        $("#d-modal-shippingLoc").removeClass("d-display-none");
    });

    // close shipping locations
    $("#d-close-shipping").click(function() {
        $("#ship-input-error").addClass("d-display-none");
        $("#add-productShippingLoc").removeClass("wrong-format");
        $("#d-modal-shippingLoc").addClass("d-display-none");
    });

    // add shipping locations

    $("#add-location").click(function() {
        if ($("#add-productShippingLoc").val() === "") {
            $("#ship-input-error").removeClass("d-display-none");
            $("#ship-input-error").text("Enter a Loaction");
            $("#add-productShippingLoc").addClass("wrong-format");
        } else {
            $("#ship-input-error").addClass("d-display-none");
            $("#add-productShippingLoc").removeClass("wrong-format");

            // get locations array
            let locationArray = JSON.parse(localStorage.getItem("locationArray")) || [];
            locationArray.push($("#add-productShippingLoc").val());
            localStorage.setItem("locationArray", JSON.stringify(locationArray));
            $("#add-productShippingLoc").val("");
            $("#shipping-input-success").show().delay(2000).fadeOut();
            $("#shipping-input-success").text("Location Added Successfully!");
        }
    });

    // get sales for merchant

    $.ajax({
        url: `${endPoint}/sales?merchant_id=${merchant.id}`,
        method: 'GET',
        success: function(res) {
            console.log('Total Sales: ')
            console.log(res)
        },
        error: function(err) {
            console.log(err)
        }
    })




    $("#logout-admin").click(function() {
        // localStorage.removeItem("Merchant-Poketo");
    });
});