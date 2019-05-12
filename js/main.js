// For the responsive nav
// Phase one on window resize
window.onresize = () => {
    let windowWidth = window.innerWidth;

    for (let i = 0; i < document.querySelectorAll('ul.nav li.nav-item').length; i++) {
        if (windowWidth <= 1020) {
            document.querySelectorAll('ul.nav li.nav-item')[0].style.display = "block";
            document.querySelectorAll('ul.nav li.nav-item')[0].style.marginTop = "-20px";
            document.querySelectorAll('ul.nav li.nav-item')[i].style.display = "none";
            document.querySelector('ul.nav ul#myCart').style.display = "none";
        } else {
            document.querySelectorAll('ul.nav li.nav-item')[0].style.display = "none";
            document.querySelectorAll('ul.nav li.nav-item')[i].style.display = "block";
            document.querySelector('ul.nav ul#myCart').style.display = "block";
        }
    }
};

// Phase two on clicking the bars_change button
//When we click on the bars_change button we want the nav to display either block or none depending on the state
document.querySelectorAll('ul.nav li.nav-item')[0].addEventListener('click', () => {
    for (let i = 0; i < document.querySelectorAll('ul.nav li.nav-item').length; i++) {
        if (document.querySelectorAll('ul.nav li.nav-item')[i + 1].style.display === "none") {
            document.querySelectorAll('ul.nav li.nav-item')[i + 1].style.display = "block";
            document.querySelector('ul.nav ul#myCart').style.display = "block";
        } else {
            document.querySelectorAll('ul.nav li.nav-item')[i + 1].style.display = "none";
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
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
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
const modal_Register = document.querySelector('#modal_wrapper_register');
const close_register = document.querySelector('#close_register');

function getTarget(event, id_name, display_style) {
    if (event.target.id === id_name) {
        modal_login.style.display = display_style;
    }
}

login_btn.addEventListener('click', function (event) {
    getTarget(event, "login_btn", "block");
});

window.onclick = function (event) {
    getTarget(event, "modal_wrapper_login", "none");
};

close_login.onclick = function (event) {
    getTarget(event, "close_login", "none");
};
Register_btn.addEventListener('click', function (event) {
    getTarget(event, "login_btn", "block");
});

window.onclick = function (event) {
    getTarget(event, "modal_wrapper_register", "none");
};

close_register.onclick = function (event) {
    getTarget(event, "close_register", "none");
};
// ------------------------------------------
//  FETCH FUNCTION
// ------------------------------------------


const getRestaurants = () =>
    fetch('js/restaurants.json').then(res => res.json());
const getMenus = () => fetch('js/menu.json').then(res => res.json());



const fetchData = () => Promise.all([getRestaurants(), getMenus()]);

fetchData().then(([restaurants, menus]) => {
    printRestaurants(restaurants.restaurants);
});

function printRestaurants(restaurants) {
    const restaurantCards = restaurants.map(printRestaurantCard);
    document.querySelector(
        '#restaurantsContainer'
    ).innerHTML = restaurantCards.join('');
    attachRestaurantEvents();
}

function printRestaurantCard(restaurant) {
    return `<div class='column-item js-restaurant' id='${restaurant.id}'>
              <article class='card-item'>
                <div class='item-content'><h4> ${restaurant.name}</h4></div>
                    <div class='item-image'><img src='${restaurant.icon}'></div>
                         <div class = 'item-content'>
                         <p>${restaurant.deal} </p> </div></article> </div>`;
}
function printRestaurantMenu(menu){
    return `<div class='column-item js-menu' >
              <article class='card-item'>
                <div class='item-content name'><h4> ${menu.denumire}</h4></div>
                    <div class='item-image'>
                      <img src='${menu.img}'>                       
                    </div>
                    <div class = 'item-content'>
                         <p>${menu.compozitie} </p>                         
                    </div>  
                    <div class="item-content" style="width:fit-content">
                      <button id='${menu.id}' class = "cart-button" data-action="ADD_TO_CART" >Adauga in cos</button></div>
                </div>
              </article>
           </div> `

}
function attachRestaurantEvents() {
    const restaurantCards = document.querySelectorAll('.js-restaurant');
    restaurantCards.forEach(card => {
        card.addEventListener('click', e => {
            fetchData().then(([restaurants, menus]) => {
                getMenuItems(menus.menus);
            });
        });
    });
}
document.querySelector('#comfortFood').addEventListener('click', displayItems);

function displayItems(){
    document.querySelector('#kitchens').style.display = 'none';
    document.querySelector('#favorites').style.display = 'none';
    document.querySelector('#options').style.display = 'none';
    document.querySelector('#restaurantsContainer').style.display = 'flex';
}


function getMenuItems(menus){
    const menuCards = menus.map(printRestaurantMenu);
    document.querySelector(
        '#menuContainer'
    ).innerHTML = menuCards.join('');
    addToCartMenuEvents()

}

function addToCartMenuEvents(){
   const buttons = document.querySelectorAll('.cart-button');
   buttons.forEach(button => {
        button.addEventListener('click', e => {
           addToCart(e.currentTarget.id);

        });
    })

}

function addToCart(id){
    const menus =  fetchData().then(([restaurants, menus]) => {
        return menus.menus;
    });
console.log(menus);
    menus.forEach(menu =>{ if(menu.id === id){
        storeCartItems(menu);
    }})
}

var cartItems = [];
function storeCartItems (menu){
    cartItems.push(menu);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}