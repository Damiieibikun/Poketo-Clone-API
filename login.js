$(document).ready(function() {
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
            // this.submit();
            let users = JSON.parse(localStorage.getItem ("users")) || []
            let usersItems = JSON.parse(localStorage.getItem("CurrentUser-cartItems")) || [];

            users.forEach((user)=>  {
                if (user.Email === email && user.password === password) {
                    localStorage.setItem ("CurrentUser", user.firstName)
                    let currentUserCart = {
                        name:  user.firstName,
                        cartItems : []
                      }

                      usersItems.push(currentUserCart)
                      localStorage.setItem('CurrentUser-cartItems', JSON.stringify(usersItems))

                    window.location.href = "index.html"
                }
            })

            }

        
    });
});
