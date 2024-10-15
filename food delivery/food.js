const restaurantMenus = {
    restaurant1: [
        { id: 1, name: "Plain dosa", price: 10, img: "images/plaindosa.jpg" },
        { id: 2, name: "Egg dosa", price: 15, img: "images/eggdosa.jpg" },
        { id: 3, name:"Masala dosa", price:10 , img:"images/masaladosa.jpg"},
        { id: 4, name:"uthappam", price:10 , img:"images/uthappam.jpg"},
        { id: 5, name:"Rava dosa", price:10 , img:"images/ravadosa.jpg"},
    ],
    restaurant2: [
        { id: 6, name: "Idly", price: 20, img: "images/idly.jpg" },
        { id: 7, name: "Podi idly", price: 12, img: "images/podiidly.jpg" },
        { id: 8, name:"sambar idly", price:10 , img:"images/sambaridly.jpg"},
    ],
    restaurant3: [
        { id: 9, name: "Veg meal", price: 12, img: "images/vegmeal.jpg" },
        { id: 10, name: "Nonveg Meal", price: 8, img: "images/nonvegmeal.jpg" },
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
        div.innerHTML = 
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <button id="add-to-cart-${item.id}" onclick="addToOrder(${item.id})">Add to Cart</button>
            </div>
        ;
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
