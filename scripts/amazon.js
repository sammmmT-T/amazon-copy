import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "../data/utils/money.js";

// render all products at initial page load
function renderProducts(filteredProducts) {
    let productsDiv = "";
    filteredProducts.forEach((product) => {
      let html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>
    
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
    
            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>
    
            <div class="product-price">
                $${centsToDollars(product.priceCents)}
            </div>
    
            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
    
            <div class="product-spacer"></div>
    
            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
    
            <button class="add-to-cart-button js-add-to-cart button-primary"
                data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
        `;
      productsDiv += html;
    });
    document.querySelector(".products-grid").innerHTML = productsDiv;
}

renderProducts(products);


// Load correct cart quantity on web load
updateCartQuantity();
function updateCartQuantity(productId) {
    // At start of webpage
    if(productId){
        document.querySelector(`.js-quantity-selector-${productId}`).value = 1;
    }

    // Add new items to cart and reset quantity selector
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}


document.querySelectorAll('.js-add-to-cart')
    .forEach(button => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset
            let productQuantity = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);

            addToCart(productId, productQuantity);
            updateCartQuantity(productId);

            // Display added text for 2 seconds
            const addedText = document.querySelector(`.js-added-to-cart-${productId}`);
            addedText.classList.toggle('added-to-cart-active');
            setTimeout(() => {
                addedText.classList.toggle('added-to-cart-active');
            }, 2000)
        });
    });

// event handler for search input
document.querySelector('.search-bar').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase(); 
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    renderProducts(filteredProducts);
    console.log('button clicked with search value: ', searchValue);
});