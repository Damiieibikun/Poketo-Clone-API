$(document).ready(function() {
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    // Hide error messages initially
    $(".error-message").hide();

    // Function to validate email format
    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    function validateNumber(phone) {
        const phoneNumberPattern = /^\d+$/;
        return phoneNumberPattern.test(phone)
    }

    // Form submit event
    $("#RegisterForm").on("submit", function(event) {
        console.log('submit triggered')
            // Prevent form from submitting
        event.preventDefault();

        // Hide all error messages
        $(".error-message").hide();

        // Get input values
        var name = $("#name").val().trim();
        var lastname = $("#lastname").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().trim();
        var password = $("#pass").val().trim();

        // Validation flag
        var isValid = true;

        // Check if name is empty
        if (name === "") {
            $("#nameErr").show();
            isValid = false;
        }

        // Check if lastname is empty
        else if (lastname === "") {
            $("#lastnameErr").show();
            isValid = false;
        }

        // Check if email is empty
        else if (email === "") {
            $("#Eerror").show();
            isValid = false;
        } else if (!validateEmail(email)) {
            // Check if email format is valid
            $("#invalidEmailError").show();
            isValid = false;
        }

        // Check if phone is empty
        else if (phone === "") {
            $("#Nerror").show();
            isValid = false;
        } else if (!validateNumber(phone)) {
            // Check if phone format is valid
            $("#invalidNumberError").show();
            isValid = false;
        }

        // Check if password is empty
        else if (password === "") {
            $("#passerror").show();
            isValid = false;
        } else if (password.length < 5) {
            $("#passlengtherror").show();
            IsVaild  =  false;
        }

        // If form is valid, submit the form
        else {

            let usersData = {
                first_name: $("#name").val(),
                last_name: $("#lastname").val(),
                email: $("#email").val(),
                phone: $('#phone').val(),
                password: $("#pass").val()
            }
            console.log(usersData)
            $.ajax({
                url: `${endPoint}/users`,
                method: 'POST',
                data: usersData,
                success: function(res) {
                    console.log(res)
                },
                error: function(err) {}
            })

            window.location.href = 'login.html'
        }

    });
});