const restaurantMenus = {
    restaurant1: {
        name: 'Restaurant 1',
        menu: [
            { name: 'Pizza', price: 12, image: 'images/pizza.jpg' },
            { name: 'Pasta', price: 8, image: 'images/pasta.jpg' },
            { name: 'Salad', price: 7, image: 'images/salad.jpg' }
        ]
    },
    restaurant2: {
        name: 'Restaurant 2',
        menu: [
            { name: 'Burger', price: 10, image: 'images/burger.jpg' },
            { name: 'Fries', price: 5, image: 'images/fries.jpg' },
            { name: 'Coke', price: 2, image: 'images/coke.jpg' }
        ]
    },
    restaurant3: {
        name: 'Restaurant 3',
        menu: [
            { name: 'Sushi', price: 15, image: 'images/sushi.jpg' },
            { name: 'Ramen', price: 12, image: 'images/ramen.jpg' },
            { name: 'Tempura', price: 10, image: 'images/tempura.jpg' }
        ]
    }
};

const restaurantListDiv = document.getElementById('restaurant-list');
const menuItemsDiv = document.getElementById('menu-items');
const orderListDiv = document.getElementById('order-list');
const placeOrderButton = document.getElementById('place-order');
const deliveryAddressInput = document.getElementById('delivery-address');

let currentOrder = [];

// Display restaurants
Object.keys(restaurantMenus).forEach(restaurantKey => {
    const restaurant = restaurantMenus[restaurantKey];
    const restaurantDiv = document.createElement('div');
    restaurantDiv.innerHTML = `<p>${restaurant.name}</p>`;
    restaurantDiv.addEventListener('click', () => displayMenu(restaurantKey));
    restaurantListDiv.appendChild(restaurantDiv);
});

// Display menu items with images
function displayMenu(restaurantKey) {
    const menu = restaurantMenus[restaurantKey].menu;
    menuItemsDiv.innerHTML = '';

    menu.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px;height:auto;">
            <span>${item.name} - $${item.price}</span>
            <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;
        menuItemsDiv.appendChild(menuItemDiv);
    });
}

// Add to order
function addToOrder(name, price) {
    currentOrder.push({ name, price });
    updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
    orderListDiv.innerHTML = '';
    let total = 0;
    currentOrder.forEach((item, index) => {
        total += item.price;
        orderListDiv.innerHTML += `
            <div>
                ${item.name} - $${item.price}
                <button onclick="removeFromOrder(${index})">Remove</button>
            </div>
        `;
    });
    orderListDiv.innerHTML += `<strong>Total: $${total}</strong>`;
    placeOrderButton.disabled = currentOrder.length === 0 || deliveryAddressInput.value.trim() === '';
}

// Remove from order
function removeFromOrder(index) {
    currentOrder.splice(index, 1);
    updateOrderSummary();
}

// Enable Place Order button
deliveryAddressInput.addEventListener('input', () => {
    placeOrderButton.disabled = currentOrder.length === 0 || deliveryAddressInput.value.trim() === '';
});

// Place Order button functionality
placeOrderButton.addEventListener('click', () => {
    if (currentOrder.length === 0 || deliveryAddressInput.value.trim() === '') {
        alert('Please complete your order and provide a delivery address.');
        return;
    }
    alert(`Your order has been placed! Total: $${currentOrder.reduce((total, item) => total + item.price, 0)}\nDelivery to: ${deliveryAddressInput.value}`);
    currentOrder = [];
    deliveryAddressInput.value = '';
    updateOrderSummary();
});

// Load default menu on page load
displayMenu('restaurant1');
