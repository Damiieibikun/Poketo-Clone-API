$(document).ready(()=>{
    const endPoint = "http://ecommerce.reworkstaging.name.ng/v2";
let userDetails = JSON.parse(localStorage.getItem('LoggedUser'))

$('#d-userBioDetails').html(`
    <span>${userDetails.first_name}</span> <span>${userDetails.last_name}</span>
    <p>${userDetails.email}</p>
    <p>${userDetails.phone}</p>
    `)


$.ajax({
url:`${endPoint}/users/likes?user_id=${userDetails.id}`,
method: 'GET',
success: function(res){
    res.forEach((element, i) => {
        let productInfo = element.product_id
        console.log(productInfo)
        $('#user-order-likes').append(`<div class="d-flex d-align-center d-gap-20">
                            <span>${i+1}</span>
                            <div class="d-likedProductIMG" style=" background-image: url(${productInfo.images[0]});"></div>
                            <p class="d-likedProductName">${productInfo.title}</p>
                            <p class="d-numofLikes"></p>
                         </div>`)
    });
},
error: function(err){
    console.log(err)
}
})




    //remove logged users details
    $('#d-account-LogOutICON').click(function(){
        localStorage.removeItem('LoggedUser')
    })
})