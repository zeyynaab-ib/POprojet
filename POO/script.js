// Classe Product pour représenter un produit
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Classe ShoppingCartItem pour représenter un article dans le panier
class ShoppingCartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}

// Classe ShoppingCart pour gérer le panier
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.incrementQuantity();
        } else {
            const newItem = new ShoppingCartItem(product, quantity);
            this.items.push(newItem);
        }
        this.renderCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.renderCart();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const totalPriceElement = document.getElementById('total-price');

        cartItemsContainer.innerHTML = ''; // Clear the current list

        if (this.items.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';

            this.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.product.name} (x${item.quantity}) - ${item.getTotalPrice()}€`;
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Supprimer';
                removeBtn.addEventListener('click', () => {
                    this.removeItem(item.product.id);
                });
                li.appendChild(removeBtn);
                cartItemsContainer.appendChild(li);
            });
        }

        totalPriceElement.textContent = this.getTotal();
    }
}

// Initialisation du panier
const cart = new ShoppingCart();

// Ajouter des produits au panier lorsque les boutons sont cliqués
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.product');
        const productId = parseInt(productElement.getAttribute('data-id'));
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        const product = new Product(productId, productName, productPrice);
        cart.addItem(product);
    });
});
