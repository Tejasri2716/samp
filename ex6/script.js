const availableLeaves = {
    casual: 10,
    medical: 15,
    earned: 12,
    maternity: 90
};

function changeDays(amount) {
    const daysInput = document.getElementById("daysRequested");
    const currentValue = parseInt(daysInput.value) || 0;
    const newValue = currentValue + amount;

    if (newValue >= 1) {
        daysInput.value = newValue;
    }
}

function applyLeave() {
    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const leaveType = document.getElementById("leaveType").value;
    const daysRequested = parseInt(document.getElementById("daysRequested").value);
    const reason = document.getElementById("reason").value.trim();

    if (!name || !contact) {
        showModal("Please enter your contact information.");
        return;
    }

    if (!isValidContact(contact)) {
        showModal("Please enter a valid email or 10-digit phone number.");
        return;
    }

    if (isNaN(daysRequested) || daysRequested <= 0) {
        showModal("Please enter a valid number of days.");
        return;
    }

    if (daysRequested > availableLeaves[leaveType]) {
        showModal(`Insufficient leave days available for ${leaveType} leave.`);
    } else {
        availableLeaves[leaveType] -= daysRequested;
        document.getElementById(`${leaveType}LeaveDays`).textContent = availableLeaves[leaveType];

        // Confirmation message without contact details
        showModal(`${name} has successfully applied for ${daysRequested} days of ${leaveType} leave.`);
    }
}

// Function to show modal
function showModal(message) {
    document.getElementById("confirmationMessage").textContent = message;
    document.getElementById("confirmationModal").style.display = "flex";
}

// Function to close modal
function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Contact validation function
function isValidContact(contact) {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(contact) || emailRegex.test(contact);
}