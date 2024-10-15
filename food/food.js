let orderItems = [];

// Function to add an item to the order
function addToOrder(itemName, itemPrice) {
    orderItems.push({ name: itemName, price: itemPrice });
    updateOrderSummary();
}

// Function to update the order summary display
function updateOrderSummary() {
    const orderSummaryDiv = document.getElementById('order-summary');
    orderSummaryDiv.innerHTML = ''; // Clear previous summary

    if (orderItems.length === 0) {
        orderSummaryDiv.innerHTML = '<p>No items in your order.</p>';
        document.getElementById('place-order').disabled = true; // Disable button if no items
        return;
    }

    let total = 0;
    orderItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - $${item.price}`;
        orderSummaryDiv.appendChild(itemDiv);
        total += item.price; // Calculate total
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
    orderSummaryDiv.appendChild(totalDiv);
    document.getElementById('place-order').disabled = false; // Enable button if items are present
}
