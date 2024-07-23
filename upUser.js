$(document).ready(function() {
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
  

    // Form submit event
    $("#UpdateForm").on("submit", function(event) {
        // Prevent form from submitting
        event.preventDefault();

        // Get input values
        const formData = {
         first_name: $("#Name1").val(),
         last_name: $("#Lastname1").val(),
         email: $("#Email2").val(),
         phone: $("#Phone13").val(),
         
        }

        let valid = validate(formData);

        if (valid) {
            $.ajax({
                url: `${endPoint}/users/:user_id`,
                method: "PUT",
                data: formData,
                success: function(res) {
                    if(res) {
                        alert("Update Successful")
                        console.log (res)
                    }
                    // window.location.href = "login.html"
                },
                error: function(err) {
                    console.log('error', err);
                }
            });
        } 
       
    });


    function validate(formData) {
        let isValid = true;

        $(".error-message").hide();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberPattern = /^\d+$/;

        if (formData.first_name === "") {
            $("#NameErr1").show();
            isValid = false;
        }

        if (formData.last_name === "") {
            $("#LastnameErr1").show();
            isValid = false;
        }

        if (formData.email === "") {
            $("#Eerror1").show();
            isValid = false;
        } else if (!emailPattern.test(formData.email)) {
            $("#InvalidEmailError1").show();
            isValid = false;
        }
        if (formData.phone === '') {
            $("#PhoneE1").show();
            isValid = false;
        } else if (formData.phone.length < 5) {
            $('#"Phonelengtherror2').show();
            isValid = false;
        } else if (!phoneNumberPattern.test(formData.phone)) {
            $('#Er6').show();
            isValid = false;
        }

        // if (formData.password === "") {
        //     $("#passerror").show();
        //     isValid = false;
        // }

        return isValid;

    }
});