$(document).ready(function(){
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";

    $("#PasswordForm").submit(function(event){
        event.preventDefault();

        
        $(".error-message").hide();

        const formData = {
            old_password: $("#passOld").val(),
            new_password: $("#passNew").val()
        };

        let valid = true;

        
        if (formData.old_password === '') {
            $("#olderror").show();
            valid = false;
        } else if (formData.old_password.length < 8) {
            $("#er34").show();
            valid = false;
        }

        
        if (formData.new_password === '') {
            $("#newerror").show();
            valid = false;
        } else if (formData.new_password.length < 8) {
            $("#er365").show();
            valid = false;
        }

        if (valid) {
            $.ajax({
                url: `${endPoint}/users/669a43e46996967a7dad94a3/change-passwd`,
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