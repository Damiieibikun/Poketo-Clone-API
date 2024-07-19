$(document).ready(function(){
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";

    $("#RegFormS3, #RegFormS4").submit(function(event) {
        event.preventDefault();

        const formData = {
            first_name: $("#fnam").val(),
            last_name: $("#lnam").val(),
            email: $("#email3").val(),
            phone: $("#phone1").val(),
            store_name: $("#storename").val(),
            descp: $("#descript").val(),
            icon: $("#iconic").val(),
            banner: $("#banner").val(),
            state: $("#state").val(),
            district: $("#district").val(),
            social_media:{ 
                x: $("#twitter").val(),
                face_book: $("#facebook").val(),
                instagram: $("#instagram").val()
            },
           
            phones: $("#phone2").val()
        };

        let valid = validate(formData);
        if (valid) {
            $.ajax({
                url: `${endPoint}/merchants/669a43e46996967a7dad94a3`,
                method: "PUT",
                data: formData,
                success: function(res) {
                    if(res) {
                        alert("Registration Update Successful");
                        console.log (res)
                    }
                    //  window.location.href = 'merchlog.html'
                },
                error: function(err) {
                    console.log('error', err);
                }
            });
        }
    });

    function validate(formData) {
        let valid = true;

        $(".error-message").hide();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberPattern = /^\d+$/;

        if (formData.first_name === '') {
            $("#err1").show();
            valid = false;
        }
        if (formData.last_name === '') {
            $("#err2").show();
            valid = false;
        }
        if (formData.email === '') {
            $("#err3").show();
            valid = false;
        } else if (!emailPattern.test(formData.email)) {
            $('#err4').show();
            valid = false;
        }
        if (formData.phone === '') {
            $("#err5").show();
            valid = false;
        } else if (formData.phone.length < 11) {
            $('#phonelengtherror').show();
            valid = false;
        } else if (!phoneNumberPattern.test(formData.phone)) {
            $('#err6').show();
            valid = false;
        }
        if (formData.store_name === '') {
            $("#err7").show();
            valid = false;
        }
        if (formData.descp === '') {
            $("#err8").show();
            valid = false;
        }
        if (formData.icon === '') {
            $("#err9").show();
            valid = false;
        }
        if (formData.banner === '') {
            $("#err10").show();
            valid = false;
        }
        if (formData.state === '') {
            $("#err15").show();
            valid = false;
        }
        if (formData.district === '') {
            $("#err16").show();
            valid = false;
        }
        if (formData.x === '') {
            $("#err18").show();
            valid = false;
        }
        if (formData.face_book === '') {
            $("#err19").show();
            valid = false;
        }
        if (formData.instagram === '') {
            $("#err20").show();
            valid = false;
        }

        return valid;
    }
});