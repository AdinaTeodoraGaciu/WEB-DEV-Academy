var slideIndex = 0;

showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}
// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}
// Modal script

const login_btn = document.querySelector('#login_btn');
const modal_login = document.querySelector('#modal_wrapper_login');
const close_login = document.querySelector('#close_login');
const Register_btn = document.querySelector('#modal_register');
const  modal_Register = document.querySelector('#modal_wrapper_register');
const close_register = document.querySelector('#close_register');

function getTarget(event, id_name, display_style){
    if(event.target.id===id_name){
        modal_login.style.display = display_style;
    }
}


// register_actions = [login_btn, modal_login, close_login];
//
// register_actions.forEach(function(action) {
//    action.onclick = function(event){
//     if(event.target.id==="modal_wrapper_login" || event.target.id==="close_login"){
//         getTarget(event.target.id, event.target.id,"none");
//     }else{
//         getTarget(event.target.id, event.target.id,"block");
//     }
//    };
// });


login_btn.addEventListener('click', function(event){
    getTarget(event,"login_btn","block");
});

window.onclick = function(event){
    getTarget(event,"modal_wrapper_login","none");
};

close_login.onclick = function(event){
    getTarget(event,"close_login","none");
};
Register_btn.addEventListener('click', function(event){
    getTarget(event,"login_btn","block");
});

window.onclick = function(event){
    getTarget(event,"modal_wrapper_register","none");
};

close_register.onclick = function(event){
    getTarget(event,"close_register","none");
};