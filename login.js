$(document).ready(function() {
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    $(".error-message").hide();


    function validateEmail(email) {
        var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }


    $("#LoginForm").on("submit", function(event) {
        event.preventDefault();
        $(".error-message").hide();


        var email = $("#email").val().trim();
        var password = $("#pass").val().trim();


        var isValid = true;


        if (email === "") {
            $("#Eerror").show();
            isValid = false;
        } else if (!validateEmail(email)) {

            $("#invalidEmailError").show();
            isValid = false;
        }


        if (password === "") {
            $("#passerror").show();
            isValid = false;
        }


        if (isValid) {
            $.ajax({
                url: `${endPoint}/users/login`,
                method: 'POST',
                data: {
                    email: email,
                    password: password
                },
                success: function(res) {
                    if (res.code === 404) {
                        $('#failedAuth').show()
                        $('#failedAuth').text(`${res.msg}`)
                    } else {
                        localStorage.setItem("LoggedUser", JSON.stringify(res))
                        window.location.href = "index.html"
                    }
                },
                error: function(err) {
                    console.log(err)
                }
            })

        }


    });
});