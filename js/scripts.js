$('.navTrigger').click(function() {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

/**
 * JavaScricpt Shopping Cart
 */
var products = [{
    name: "PS1",
    image: "images/ps1cal1.jpg",
    price: 300.00,
    qtty: 1
}, {
    name: "PS2",
    image: "images/2000ps2.jpg",
    price: 250.00,
    qtty: 1
}, {
    name: "PS3",
    image: "images/2000ps3.png",
    price: 300.00,
    qtty: 1
}, {
    name: "PS4",
    image: "images/PS4.jpg",
    price: 450.00,
    qtty: 1
}, {
    name: "PS5",
    image: "images/ps5.jpg",
    price: 600.00,
    qtty: 1
}, {
    name: "Nintendo 64",
    image: "images/n641990.jpg",
    price: 400.00,
    qtty: 1
}, {
    name: "Nintendo Switch",
    image: "images/Nintendo_Switch_Console.png",
    price: 230.00,
    qtty: 1
}, {
    name: "Xbox",
    image: "images/xbox.jpg",
    price: 400.00,
    qtty: 1
}, {
    name: "Xbox 360",
    image: "images/xbox360.jpg",
    price: 350.00,
    qtty: 1
}, {
    name: "Xbox One",
    image: "images/xboxone.jpg",
    price: 300.00,
    qtty: 1
}, {
    name: "Xbox Serries X",
    image: "images/xboxserriesx.jpg",
    price: 600.00,
    qtty: 1
}];

for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class="product-title h3 m-3">${val.name}</p>
    <img class="product-image" src="${val.image}" width="200" height="200">
    <div class="product-details">
        <p class="product-price h4 m-3">${val.price} €</p>
        <button class="btn btn-primary product-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `
}

var cart = [];

function addToCart(product, index) {
    if (cart.length == 0) {
        cart.push(product);
    } else if (cart.find((val) => val.name == product.name)) {
        cart[index].qtty++;
    } else {
        cart.push(product);
    }
    console.table(cart);
    createRows();
    Total();
}


let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i], i);
    })
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
       
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();
        });
    }
}

function Total() {
    let total = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
    }
    document.getElementById("price").innerHTML = total.toFixed(2) + " €";
}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(28.1823295, -82.352912),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        draggable: false,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);