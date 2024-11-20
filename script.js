const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadfood);

function loadfood(){
    loadContent();
}

function loadContent(){
    //Remove food items from cart

    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //Product item change event
    let qtyElement = document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('click', changeQty);
    });

    //Product add to the cart
    let cartBtn = document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn)=>{
        btn.addEventListener('click',addCart)
    })

    updateTotal();
}

//Remove item 

let orderPlaced = false;

function removeItem(){

    if(orderPlaced){
        return;
    }

    if(confirm('Are you sure to Remove the item')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=>el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

function changeQty(){

    if(isNaN(this.value) || this.value < 1) this.value = 1;
    loadContent();
}

let itemList = [];

function addCart(){
  
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let newFood = {title,price,imgSrc}

    if(itemList.find((el)=>el.title == newFood.title)){
        alert("Selected Food Already Added In Cart");
        return;
    }
    else{
        itemList.push(newFood);
    }

    let newElem = createCartProduct(title,price,imgSrc);
    let elem = document.createElement('div');
    elem.innerHTML = newElem;
    let cartBox = document.querySelector('.cart-content');
    cartBox.append(elem);
    loadContent();
}

function createCartProduct(title,price,imgSrc){

    return `    
    <div class="cart-box">   
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
      <input type="number" value="1" class="cart-quantity">
      </div>
      <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
    `;
}

function updateTotal(){

    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product=>{
        let priceElem = product.querySelector('.cart-price');
        let price = parseFloat(priceElem.innerHTML.replace("Rs.",""));
        let qty = product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText = 'Rs.'+(price*qty);
    });

    totalValue.innerHTML='Rs.'+total;

    // Add Product Count in Cart Icon

    const cartCount = document.querySelector('.cart-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if(count == 0){
        cartCount.style.display = 'none';
    }
    else{
        cartCount.style.display = 'block';
    }
}

function showOrder(){
    let mes = document.querySelector('.output');
    if(itemList.length == 0){
        // mes.innerHTML = ''
        return;
    }
    else{
        mes.innerHTML = 'Wohooo!... Your order is placed..!'
        orderPlaced = true;

        let qtyElements = document.querySelectorAll('.cart-quantity');
        qtyElements.forEach((input) => {
            input.disabled = true;
        });
    }
}


//  