const restaurantMenus = {
    restaurant1: [ // Vegetarian
        { id: 1, name: "Plain Dosa", price: 10, img:"image/plain dosa.jpg" },
        { id: 2, name: "Idly", price: 15, img: "image/idly.jpg" },
        { id: 3, name: "Masala Dosa", price: 10, img: "image/masala dosa.jpg" },
        { id: 4, name: "Chola Poori", price: 10, img: "image/chola poori.jpg" },
    ],
    restaurant2: [ // Non-Vegetarian
        { id: 6, name: "Chicken Biryani", price: 20, img: "image/chicken biryani.jpg" },
        { id: 7, name: "Mutton Curry", price: 25, img: "image/mutton curry.jpg" },
        { id: 8, name: "Fish Fry", price: 15, img: "image/fish fry.jpg" },
    ],
    restaurant3: [ // Desserts
        { id: 9, name: "Chocolate Cake", price: 12, img: "image/chocolate cake.jpg" },
        { id: 10, name: "Ice Cream Sundae", price: 8, img: "image/ice cream.jpg" },
        { id: 11, name: "Gulab Jamun", price: 10, img: "image/gulab jamun.jpg" },
    ],
};

// Function to display menu items for the selected restaurant
function displayMenu(restaurant) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = ''; // Clear previous items
    const menuItems = restaurantMenus[restaurant];

    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button id="add-to-cart-${item.id}" onclick="addToOrder(${item.id})">Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

// Initialize user info and check login
function initUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userInfoDiv = document.getElementById('user-info');

    if (user) {
        userInfoDiv.innerHTML = `Welcome, ${user.name} (${user.phone})`;
        enableAddToCartButtons();
        const selectedRestaurant = document.getElementById('restaurant-select').value;
        displayMenu(selectedRestaurant); // Load default restaurant menu
    } else {
        window.location.href = 'login.html';
    }
}

// Call initUser when the page loads
document.addEventListener('DOMContentLoaded', initUser);

// Event listener for restaurant selection change
document.getElementById('restaurant-select').addEventListener('change', function() {
    displayMenu(this.value);
});

// Function to handle order placement
document.getElementById('place-order').onclick = function() {
    const address = document.getElementById('delivery-address').value;
    const discountCode = document.getElementById('discount-code').value;
    
    if (order.length > 0) {
        if (address) {
            let total = order.reduce((sum, item) => sum + item.price, 0);
            if (discountCode === "DISCOUNT10") {
                total *= 0.9; // Apply a 10% discount
                alert('Discount applied: 10% off!');
            }

            alert(`Order placed successfully!\nDelivery Address: ${address}\nTotal Amount: $${total.toFixed(2)}`);
            order = []; // Reset order
            document.getElementById('delivery-address').value = ''; // Clear address field
            document.getElementById('discount-code').value = ''; // Clear discount field
            updateOrderSummary();
        } else {
            alert('Please enter a delivery address.');
        }
    } else {
        alert('Your order is empty!');
    }
};

// Event listener for restaurant selection
document.getElementById('restaurant-select').addEventListener('change', function() {
    displayMenu(this.value);
});

// Initial call to check user and load menu
initUser();
