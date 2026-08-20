// Holt die benötigten Elemente aus der HTML-Seite
const inventoryTableBody = document.querySelector("#inventory-table tbody");
const popupForm = document.getElementById("popup-form");
const deviceName = document.getElementById("device-name");
const serialNumber = document.getElementById("serial-number");
const categoryId = document.getElementById("category-id");
const locationId = document.getElementById("location-id");
const status = document.getElementById("status");
const description = document.getElementById("description");
const deviceId = document.getElementById("device-id");
const addDeviceButton = document.getElementById("add-device");

// Zeigt die geladenen Inventargeräte in der Tabelle an
function renderInventory(data) {
    inventoryTableBody.innerHTML = "";

    data.forEach((device) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${device.id}</td>
            <td>${device.name}</td>
            <td>${device.serial_number}</td>
            <td>${device.category}</td>
            <td>${device.location}</td>
            <td>${device.status}</td>
            <td>${device.description}</td>
            <td>
                <button class="edit-btn" data-id="${device.id}">
                    Bearbeiten
                </button>
            </td>
        `;

        // Öffnet das Formular mit den Daten des ausgewählten Geräts
        const editButton = row.querySelector(".edit-btn");

        editButton.addEventListener("click", () => {
            openPopup("Gerät bearbeiten");

            deviceId.value = device.id;
            deviceName.value = device.name;
            serialNumber.value = device.serial_number;
            categoryId.value = device.category_id;
            locationId.value = device.location_id;
            status.value = device.status;
            description.value = device.description;
        });

        inventoryTableBody.appendChild(row);
    });
}

// Lädt die Inventargeräte aus dem Backend
function loadInventory() {
    fetch("/inventory")
        .then((response) => response.json())
        .then((data) => {
            renderInventory(data);
        });
}

loadInventory();

// Erstellt ein neues Gerät oder aktualisiert ein bestehendes Gerät
popupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const deviceData = {
        name: deviceName.value,
        serial_number: serialNumber.value,
        category_id: categoryId.value,
        location_id: locationId.value,
        status: status.value,
        description: description.value,
    };

    if (deviceId.value) {
        fetch(`/inventory/${deviceId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deviceData),
        })
            .then((response) => response.json())
            .then(() => {
                closePopup();
                loadInventory();
            });
    } else {
        fetch("/inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deviceData),
        })
            .then((response) => response.json())
            .then(() => {
                closePopup();
                loadInventory();
            });
    }
});

// Setzt die Daten im Formular für ein neues Gerät zurück
addDeviceButton.addEventListener("click", () => {
    deviceId.value = "";
    deviceName.value = "";
    serialNumber.value = "";
    categoryId.value = "";
    locationId.value = "";
    status.value = "En Stock";
    description.value = "";
});