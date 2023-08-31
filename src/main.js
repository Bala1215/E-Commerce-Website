let shop = document.getElementById('shop');


//check whether any item was there in local storage, if it was then store it in basket
//otherwise empty array was stored in basket
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () =>{
    return(shop.innerHTML = shopItemsData.map((x)=>{
        let {id , name, price , desc , img} = x;
        // console.log(basket);
        let search = basket.find((x)=>x.id === id) || [];
        return `
        <div class="item" id=product-id-${id}>
        <img width="220" src=${img} alt="t-shirt"/>
        <div class="details" >
             <h3>${name}</h3>
             <p>${desc}</p>

             <div class="price-quantity">
                <h2>₹ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})"  class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                 
                </div>
             </div>
            </div>
        </div>
        `;
    })
    .join(""));
};

generateShop();


let increment = (id)=>{
    let selectedItem = id;

    //check whether the selectedItem is already there in basket or not
    let search = basket.find((item)=> item.id === selectedItem.id);

   //if not there
   if(search === undefined){
    basket.push({
        id: selectedItem.id,
        item:1,
    });
   }
   //if there, then increment count of the selectedItem
   else{
     search.item +=1;
   }

   console.log("Selected Item : ",selectedItem);
   console.log("Selected Item.id : ",selectedItem.id);
   console.log("Basket : ",basket);
   update(selectedItem.id);
   localStorage.setItem("data",JSON.stringify(basket));
   
};

let decrement = (id)=>{
    let selectedItem = id;

    //check whether the selectedItem is already there in basket or not
    let search = basket.find((item)=> item.id === selectedItem.id);

   //if not there
   if(search === undefined) return;
   else if(search.item === 0) return;
   //if there, then increment count of the selectedItem
   else{
     search.item -=1;
   }

   console.log(basket);
   update(selectedItem.id);
   basket = basket.filter((x)=> x.item !==0);

   //setItem(firstparamter,secondParameter) = > firstParamter : name of the item , second parameter : value of the item
   localStorage.setItem("data",JSON.stringify(basket));

};

let update = (id) =>{
    let search =  basket.find((x)=> x.id === id);
    document.getElementById(id).innerHTML = search.item;
    console.log(id);

    //whenever update() is called , calculation() is also called to update total no.of.items in the cart 
    calculation();

}

let calculation = () =>{
    let cartIcon = document.getElementById("cartAmount");
    //reduce((x,y)=> x+y,0) => here second parameter '0' is default value
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((prevItem, currItem) => prevItem + currItem, 0);
};

calculation();
/**
 * !why calculation() is called again..?
 * !Answer : whenever the page gets refreshed , it will display '0' in cart. But when any item is added, 
 * !then the cart get incremented the value which gets from localstorage.To avoid this issue, calculation() called whenever the page gets loaded.
 */



