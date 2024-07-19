$(document).ready(function() {
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";

    $("#RegFormS, #RegFormS2").submit(function(event) {
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
            phones: $("#phone2").val(),
            password: $("#password1").val(),
            repass: $("#repass").val()  
        };

        let valid = validate(formData);

        if (valid) {
            $.ajax({
                url: `${endPoint}/merchants`,
                method: "POST",
                data: formData,
                success: function(res) {
                    if(res) {
                        alert("Registration Successful");
                        console.log (res)
                    }
                     window.location.href = 'merchlog.html'
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
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

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
        else if(!urlPattern.test(formData.icon)){
            $("#err9_1").show();
            console.log('false')
            valid = false;
        }


        if (formData.banner === '') {
            $("#err10").show();
            valid = false;
        }
        if (formData.password === '') {
            $("#err11").show();
            valid = false;
        } else if (formData.password.length < 5) {
            $('#lengtherror').show();
            valid = false;
        }
        if (formData.password !== formData.repass) {
            $('#re_typeerror').show();
            valid = false;
        }

        return valid;
    }
});