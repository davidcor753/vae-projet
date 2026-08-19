// Holt die benötigten Elemente aus der HTML-Seite
const popupBackground = document.getElementById("popup-background");
const popupTitle = document.getElementById("popup-title");
const popupForm = document.getElementById("popup-form");
const addDeviceButton = document.getElementById("add-device");
const cancelButton = document.getElementById("cancel-btn");

const deviceId = document.getElementById("device-id");
const deviceName = document.getElementById("device-name");
const serialNumber = document.getElementById("serial-number");
const categoryId = document.getElementById("category-id");
const locationId = document.getElementById("location-id");
const status = document.getElementById("status");
const description = document.getElementById("description");

// Öffnet das Popup und setzt den Titel
function openPopup(title) {
    popupTitle.textContent = title;
    popupBackground.style.display = "block";
}

// Schließt das Popup
function closePopup() {
    popupBackground.style.display = "none";
}

// Öffnet das Popup beim Klick auf "Neues Gerät hinzufügen"
addDeviceButton.addEventListener("click", () => {
    openPopup("Neues Gerät hinzufügen");
});

// Schließt das Popup beim Klick auf "Abbrechen"
cancelButton.addEventListener("click", closePopup);