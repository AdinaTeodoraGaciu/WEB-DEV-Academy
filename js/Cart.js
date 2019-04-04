// Get quantities
let quantity1 = document.querySelector('#qt-1');
let quantity2 = document.querySelector('#qt-2');
let quantity3 = document.querySelector('#qt-3');

// Get full prices
let full_price1 = document.querySelector('#full-price1');
const current_price1 = parseInt(document.querySelector('#full-price1').innerHTML);

let full_price2 = document.querySelector('#full-price2');
const current_price2 = parseInt(document.querySelector('#full-price2').innerHTML);

let full_price3 = document.querySelector('#full-price3');
const current_price3 = parseInt(document.querySelector('#full-price3').innerHTML);



let total = document.querySelector('#total');
total.innerHTML = current_price1 + current_price2 + current_price3 + ".00 lei";
const current_total = parseInt(document.querySelector('#total').innerHTML);

// Car btn handlers
const event_handlers = [document.querySelector('#qt-plus1'), document.querySelector('#qt-plus2'), document.querySelector('#qt-plus3'),document.querySelector('#qt-minus1'),document.querySelector('#qt-minus2'),document.querySelector('#qt-minus3')];


event_handlers.forEach(function(data_btn){
    data_btn.addEventListener('click', (event)=>{
        switch(event.target.id){
            case "qt-plus1":
                quantity1.innerHTML = parseInt(++document.querySelector('#qt-1').innerHTML);
                full_price = parseInt(document.querySelector('#full-price1').innerHTML);
                full_price1.innerHTML = full_price + current_price1 + ".00 lei";
                break;

            case "qt-plus2":
                quantity2.innerHTML = parseInt(++document.querySelector('#qt-2').innerHTML);
                full_price = parseInt(document.querySelector('#full-price2').innerHTML);
                full_price2.innerHTML = full_price + current_price2 + ".00 lei";
                break;

            case "qt-plus3":
                quantity3.innerHTML = parseInt(++document.querySelector('#qt-3').innerHTML);
                full_price = parseInt(document.querySelector('#full-price3').innerHTML);
                full_price3.innerHTML = full_price + current_price3 + ".00 lei";
                break;

            case "qt-minus1":
                quantity1.innerHTML = parseInt(--document.querySelector('#qt-1').innerHTML);
                resetQuantity(quantity1);

                full_price = parseInt(document.querySelector('#full-price1').innerHTML);
                full_price1.innerHTML = full_price - current_price1 + ".00 lei";
                resetFullPrice(full_price, current_price1, document.querySelector('#full-price1'));

                break;

            case "qt-minus2":
                quantity2.innerHTML = parseInt(--document.querySelector('#qt-2').innerHTML);
                resetQuantity(quantity2);

                full_price = parseInt(document.querySelector('#full-price2').innerHTML);
                full_price2.innerHTML = full_price - current_price2 + ".00 lei";
                resetFullPrice(full_price, current_price2, document.querySelector('#full-price2'));

                break;

            case "qt-minus3":
                quantity3.innerHTML = parseInt(--document.querySelector('#qt-3').innerHTML);
                resetQuantity(quantity3);

                full_price = parseInt(document.querySelector('#full-price3').innerHTML);
                full_price3.innerHTML = full_price - current_price3 + ".00 lei";
                resetFullPrice(full_price, current_price3, document.querySelector('#full-price3'));

                break;
        }

    })
});

let resetQuantity = (quantity)=>{
    if(quantity.innerHTML < 1){
        quantity.innerHTML = 1;
    }
};

let resetFullPrice = (full_price, current_price, param_price)=>{
    if(full_price === current_price){
        param_price.innerHTML = current_price + ".00 lei";
    }
};


// Modal script for cart

const cart_btn = document.querySelector('#cart_btn');
const modal_cart = document.querySelector('#modal_wrapper_cart');
const close_cart = document.querySelector('#close_cart');

function getTarget(event, id_name, display_style){
    if(event.target.id===id_name){
        modal_cart.style.display = display_style;
    }
}

cart_btn.addEventListener('click', function(event){
    getTarget(event,"cart_btn","block");
});

window.onclick = function(event){
    getTarget(event,"modal_wrapper_cart","none");
};

close_cart.onclick = function(event){
    getTarget(event,"close_cart","none");
};


document.querySelector("#cart_comanda").addEventListener('click', function(){

    if(document.querySelector("#user_address").value===""){
        document.querySelector("#cart_head").innerHTML = "Va rugam completati campul adresa!";
    }else{
        document.querySelector(".wrap-cart").innerHTML = "<h1>Comanda dvs a fost inregistrata cu succes!</h1>";
        setInterval(function(){

            document.querySelector("#modal_wrapper_cart").style.display = "none";
        }, 2000);
    }

});


// Remove products from cart
document.querySelectorAll('h3').forEach(function(data){
    data.addEventListener('click', function(){
        this.parentElement.parentElement.parentElement.remove();
    })
});







