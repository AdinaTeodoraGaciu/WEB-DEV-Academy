
// For the responsive nav
// Phase one on window resize
window.onresize = ()=>{
    let windowWidth = window.innerWidth;

    for(let i = 0; i<document.querySelectorAll('ul.nav li.nav-item').length; i++){
        if(windowWidth <= 1020) {
            document.querySelectorAll('ul.nav li.nav-item')[0].style.display = "block";
            document.querySelectorAll('ul.nav li.nav-item')[0].style.marginTop = "-20px";
            document.querySelectorAll('ul.nav li.nav-item')[i].style.display = "none";
            document.querySelector('ul.nav ul#myCart').style.display = "none";
        }else{
            document.querySelectorAll('ul.nav li.nav-item')[0].style.display ="none";
            document.querySelectorAll('ul.nav li.nav-item')[i].style.display = "block";
            document.querySelector('ul.nav ul#myCart').style.display = "block";
        }
    }
};

// Phase two on clicking the bars_change button
//When we click on the bars_change button we want the nav to display either block or none depending on the state
document.querySelectorAll('ul.nav li.nav-item')[0].addEventListener('click', ()=>{
    for(let i = 0; i<document.querySelectorAll('ul.nav li.nav-item').length; i++){
        if(document.querySelectorAll('ul.nav li.nav-item')[i+1].style.display === "none"){
            document.querySelectorAll('ul.nav li.nav-item')[i+1].style.display = "block";
            document.querySelector('ul.nav ul#myCart').style.display = "block";
        }else{
            document.querySelectorAll('ul.nav li.nav-item')[i+1].style.display = "none";
            document.querySelector('ul.nav ul#myCart').style.display = "none";
        }
    }

});
let slideIndex = 0;

showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
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

function classToggle() {
    const navs = document.querySelectorAll('.nav-item')

    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}
document.querySelector('.toggle')
    .addEventListener('click', classToggle);

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
// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------
const urls = ['js/restaurants.json','js/menu.json'];
function fetchData(){
    Promise.all(urls.map(url =>
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
            const restaurantList = data[0];
            const menuList = data[1];
            console.log(menuList);
            getRestaurantData(restaurantList);
        })


}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}
function parseJSON(response) {
    return response.json();
}
 function getRestaurantData(data){
    if(data){
        displayRestaurants(data);
    }
 }

function generateResturantCards(data){
     let restaurantIds = [];
    if(data) {
        for (let i = 0; i < data.restaurants.length; i++) {
            document.querySelector('#restaurantsContainer').innerHTML +=
            `<div class='column-item' id='${data.restaurants[i].id}'>
              <article class='card-item'>
                <div class='item-content'><h4> ${data.restaurants[i].name}</h4></div>
                    <div class='item-image'><img src='${data.restaurants[i].icon}'></div>
                         <div class = 'item-content'><p>" ${data.restaurants[i].deal} </p> </div></article> </div>`
            restaurantIds.push(data.restaurants[i].id);
        }

    }
 generateMenu(restaurantIds);
}
function generateMenu (ids){
    ids.forEach(function(data_btn){
        data_btn.addEventListener('click', (event)=> {
            switch (event.target.id) {
                case "gusto":
                    generateRestaurantMenu(data);
                    break;
                case "kfc":
                    generateRestaurantMenu();
                    break;
            }
         })
    })
}

function displayRestaurants (data){
    document.querySelector('#kitchens').style.display = 'none';
    document.querySelector('#favorites').style.display = 'none';
    document.querySelector('#options').style.display = 'none';
    generateResturantCards(data);

}
document.querySelector('#comfortFood').addEventListener('click',fetchData);

function generateRestaurantMenu() {
    fetchData();
    if (data) {
        for (let i = 0; i < data.menu.length; i++) {
            document.querySelector('#menuContainer').innerHTML +=
                `<table> <tr>
                   <td>${data.menu[i].nume}</td>
                     </tr>
                    </table>`
        }
    }
}


