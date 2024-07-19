$(document).ready(function(){
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";

    $("#logiNForm").submit(function(event){
        event.preventDefault();

        const formData = {
            email: $("#email1").val(),
            password: $("#pass1").val()
        };

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email)) {
            $('#err21').show();
            return;
        } else {
            $('#err21').hide();
        }
        if (formData.password === "") {
            $("#err31").show();
            return;
        } else {
            $("#err31").hide();
        }

        $.ajax({
            url: `${endPoint}/merchants/login`,
            method: 'POST',
            data: formData,
            success: function (res) {
                console.log("login", res);
                console.log('success');
                if (res.code === 404) {
                    $('#err11').show();
                    $("#err11").text("invalid email or password");
                } else {
                    localStorage.setItem('user', JSON.stringify(res));
                    // location.href = 'index.html'
                }
            },
            error: function (error) {
                console.log('error', error);
            }
        });

    });
});