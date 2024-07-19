$(document).ready(function(){
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
    let merchant = JSON.parse(localStorage.getItem('Merchant-Poketo'))

    $("#UpdatePass").submit(function(event){
        event.preventDefault();

        
        $(".error-message").hide();

        const formData = {
            old_password: $("#pass1").val(),
            new_password: $("#pass2").val()
        };

        let valid = true;

        
        if (formData.old_password === '') {
            $("#er1").show();
            valid = false;
        } else if (formData.old_password.length < 8) {
            $("#er2").show();
            valid = false;
        }

        
        if (formData.new_password === '') {
            $("#newpass").show();
            valid = false;
        } else if (formData.new_password.length < 8) {
            $("#newpass2").show();
            valid = false;
        }

        if (valid) {
            $.ajax({
                url: `${endPoint}/merchants/${merchant.id}/change-passwd`,
                method: "PUT",
                data: formData,
                success: function(res) {
                    if(res) {
                        alert("Update Successful");
                        console.log(res);
                    }
                    //  window.location.href = 'merchlog.html'
                },
                error: function(err) {
                    console.log('error', err);
                }
            });
        }

        return valid;
    });
});