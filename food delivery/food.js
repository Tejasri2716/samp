const restaurantMenus = {
    restaurant1: {
        name: 'Restaurant 1',
        image: 'restaurant1.jpg', // Image path for Restaurant 1
        menu: [
            { name: 'Pizza', price: 12, image: 'pizza.jpg' },
            { name: 'Pasta', price: 8, image: 'pasta.jpg' },
            { name: 'Salad', price: 7, image: 'salad.jpg' }
        ]
    },
    restaurant2: {
        name: 'Restaurant 2',
        image: 'restaurant2.jpg', // Image path for Restaurant 2
        menu: [
            { name: 'Burger', price: 10, image: 'burger.jpg' },
            { name: 'Fries', price: 5, image: 'fries.jpg' },
            { name: 'Coke', price: 2, image: 'coke.jpg' }
        ]
    },
    restaurant3: {
        name: 'Restaurant 3',
        image: 'restaurant3.jpg', // Image path for Restaurant 3
        menu: [
            { name: 'Sushi', price: 15, image: 'sushi.jpg' },
            { name: 'Ramen', price: 12, image: 'ramen.jpg' },
            { name: 'Tempura', price: 10, image: 'tempura.jpg' }
        ]
    }
};

// Elements
const restaurantListDiv = document.getElementById('restaurant-list');
const menuItemsDiv = document.getElementById('menu-items');
const orderListDiv = document.getElementById('order-list');
const placeOrderButton = document.getElementById('place-order');
const deliveryAddressInput = document.getElementById('delivery-address');

let currentOrder = [];

// Display restaurants with images
Object.keys(restaurantMenus).forEach(restaurantKey => {
    const restaurant = restaurantMenus[restaurantKey];
    
    const restaurantDiv = document.createElement('div');
    restaurantDiv.innerHTML = `
        <img src="${restaurant.image}" alt="${restaurant.name}">
        <p>${restaurant.name}</p>
    `;
    restaurantDiv.addEventListener('click', () => displayMenu(restaurantKey));
    
    restaurantListDiv.appendChild(restaurantDiv);
});

// Display menu items with images when a restaurant is selected
function displayMenu(restaurantKey) {
    const restaurant = restaurantMenus[restaurantKey];
    const menu = restaurant.menu;

    // Clear previous menu
    menuItemsDiv.innerHTML = '';

    // Display menu items
    menu.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - $${item.price}</span>
            <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;
        menuItemsDiv.appendChild(menuItemDiv);
    });
}

// Add item to order
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
        const orderItemDiv = document.createElement('div');
        orderItemDiv.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromOrder(${index})">Remove</button>
        `;
        orderListDiv.appendChild(orderItemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = <strong>Total: $${total}</strong>;
    orderListDiv.appendChild(totalDiv);

    // Enable the "Place Order" button if there's a valid delivery address and order
    placeOrderButton.disabled = currentOrder.length === 0 || deliveryAddressInput.value.trim() === '';
}

// Remove item from order
function removeFromOrder(index) {
    currentOrder.splice(index, 1);
    updateOrderSummary();
}

// Enable "Place Order" button when address is entered
deliveryAddressInput.addEventListener('input', () => {
    placeOrderButton.disabled = currentOrder.length === 0 || deliveryAddressInput.value.trim() === '';
});

// Place the order
placeOrderButton.addEventListener('click', () => {
    if (currentOrder.length === 0 || deliveryAddressInput.value.trim() === '') {
        alert('Please complete your order and provide a delivery address.');
        return;
    }

    alert(Your order has been placed! Total: $${currentOrder.reduce((total, item) => total + item.price, 0)}\nDelivery to: ${deliveryAddressInput.value});
    
    // Reset order after placing
    currentOrder = [];
    deliveryAddressInput.value = '';
    updateOrderSummary();
});

// Load default restaurant menu on page load
displayMenu('restaurant1');
