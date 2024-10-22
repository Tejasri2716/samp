const restaurantMenus = {
    restaurant1: [
        { id: 1, name: "Pizza", price: 10, img: "image/pizza.jpg" },
        { id: 2, name: "Pasta", price: 15, img: "image/pasta.jpg" },
        { id: 3, name: "Salad", price: 10, img: "image/salad.jpg" },
    ],
    restaurant2: [
        { id: 4, name: "Burger", price: 20, img: "image/burger.jpg" },
        { id: 5, name: "Fries", price: 12, img: "image/fries.jpg" },
        { id: 6, name: "Coke", price: 10, img: "image/coke.jpg" },
    ],
    restaurant3: [
        { id: 7, name: "Sushi", price: 12, img: "image/sushi.jpg" },
        { id: 8, name: "Ramen", price: 8, img: "image/ramen.jpg" },
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
        userInfoDiv.innerHTML = Welcome, ${user.name} (${user.phone});
        enableAddToCartButtons();
        displayMenu(document.getElementById('restaurant-select').value); // Load default restaurant
    } else {
        window.location.href = 'login.html';
    }
}

// Function to enable "Add to Cart" buttons
function enableAddToCartButtons() {
    const buttons = document.querySelectorAll('button[id^="add-to-cart-"]');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Order array
let order = [];

// Function to add item to order
function addToOrder(id) {
    const restaurant = document.getElementById('restaurant-select').value;
    const item = restaurantMenus[restaurant].find(item => item.id === id);
    order.push(item);
    updateOrderSummary();
}

// Function to update order summary
function updateOrderSummary() {
    const orderContainer = document.getElementById('order-summary');
    orderContainer.innerHTML = ''; // Clear current order
    let total = 0;

    order.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = ${item.name} - $${item.price};
        orderContainer.appendChild(div);
        total += item.price;
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = <strong>Total: $${total}</strong>;
    orderContainer.appendChild(totalDiv);

    // Enable the place order button if there are items in the order
    document.getElementById('place-order').disabled = order.length === 0;
}

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

            alert(Order placed successfully!\nDelivery Address: ${address}\nTotal Amount: $${total.toFixed(2)});
            order = []; // Reset order
            document.getElementById('delivery-address').value = ''; // Clear address field
            document.getElementById('discount-code').value = ''; // Clear discount field
            updateOrderSummary();

            // Show the feedback section
            document.getElementById('feedback-section').style.display = 'block';
        } else {
            alert('Please enter a delivery address.');
        }
    } else {
        alert('Your order is empty!');
    }
};

// Handle star rating
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        stars.forEach(s => {
            s.style.color = s.getAttribute('data-value') <= selectedRating ? '#ffcc00' : '#fff';
        });
    });
});

// Function to submit feedback
document.getElementById('submit-feedback').onclick = function() {
    const feedback = document.getElementById('order-feedback').value;
    const feedbackList = document.getElementById('feedback-list');

    if (selectedRating === "0") {
        alert('Please select a rating.');
        return;
    }

    const feedbackItem = document.createElement('div');
    feedbackItem.innerHTML = <strong>Rating: ${selectedRating}</strong> - ${feedback};
    feedbackList.appendChild(feedbackItem);

    // Clear input fields
    selectedRating = 0;
    stars.forEach(s => s.style.color = '#fff'); // Reset star color
    document.getElementById('order-feedback').value = '';
};

// Event listener for restaurant selection
document.getElementById('restaurant-select').addEventListener('change', function() {
    displayMenu(this.value);
});

// Initial call to check user and load menu
initUser();
