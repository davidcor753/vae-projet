// Holt die benötigten Elemente aus der HTML-Seite
const inventoryTableBody = document.querySelector("#inventory-table tbody");
const deviceForm = document.getElementById("device-form");
const deviceName = document.getElementById("device-name");
const serialNumber = document.getElementById("serial-number");
const categoryId = document.getElementById("category-id");
const locationId = document.getElementById("location-id");
const status = document.getElementById("status");
const description = document.getElementById("description");
const deviceId = document.getElementById("device-id");
const addDeviceButton = document.getElementById("add-device");
const formTitle = document.getElementById("form-title");
const cancelEditButton = document.getElementById("cancel-edit");
const inventoryMessage = document.getElementById("inventory-message");

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

    <button class="delete-btn" data-id="${device.id}">
        Löschen
    </button>
</td>
        `;

    // Füllt das Formular mit den Daten des ausgewählten Geräts
    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");

    editButton.addEventListener("click", () => {
      deviceId.value = device.id;
      deviceName.value = device.name;
      serialNumber.value = device.serial_number;
      categoryId.value = device.category_id;
      locationId.value = device.location_id;
      status.value = device.status;
      description.value = device.description;

      formTitle.textContent = "Gerät bearbeiten";
      cancelEditButton.hidden = false;
    });

    // Löscht das ausgewählte Gerät nach Bestätigung
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Möchtest du dieses Gerät wirklich löschen?");

      if (confirmed) {
        fetch(`/inventory/${device.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              loadInventory();
              inventoryMessage.textContent = "Gerät wurde gelöscht.";
            } else {
              inventoryMessage.textContent =
                "Gerät konnte nicht gelöscht werden.";
            }
          });
      }
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
deviceForm.addEventListener("submit", (event) => {
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
      .then((data) => {
        if (data.success) {
          loadInventory();
          inventoryMessage.textContent = "Gerät wurde aktualisiert.";
        } else {
          inventoryMessage.textContent = data.error;
        }
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
      .then((data) => {
        if (data.success) {
          loadInventory();
          inventoryMessage.textContent = "Gerät wurde erstellt.";
        } else {
          inventoryMessage.textContent = data.error;
        }
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

  formTitle.textContent = "Neues Gerät";
  cancelEditButton.hidden = true;
});

// Bricht die Bearbeitung ab und leert das Formular
cancelEditButton.addEventListener("click", () => {
  deviceId.value = "";
  deviceName.value = "";
  serialNumber.value = "";
  categoryId.value = "";
  locationId.value = "";
  status.value = "En Stock";
  description.value = "";

  formTitle.textContent = "Neues Gerät";
  cancelEditButton.hidden = true;
});

// Zeigt die Benutzerverwaltung nur für Administratoren an
fetch("/api/whoami")
  .then((response) => response.json())
  .then((user) => {
    if (user.role === "admin") {
      document.getElementById("users-link").style.display = "inline";
    }
  });