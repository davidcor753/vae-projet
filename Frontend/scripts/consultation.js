const actionsTableBody = document.querySelector("#actions-table tbody");

// Zeigt die geladenen Inventar-Aktionen in der Tabelle an
function renderActions(data) {
  actionsTableBody.innerHTML = "";

  data.forEach((action) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${action.id}</td>
      <td>${action.item_id}</td>
      <td>${action.action_type}</td>
      <td>${action.actor_user_id}</td>
      <td>${action.actor_username}</td>
      <td>${new Date(action.created_at).toLocaleString("de-LU")}</td>
    `;

    actionsTableBody.appendChild(row);
  });
}

// Lädt die Inventar-Historie aus dem Backend
function loadActions() {
  fetch("/inventory/actions")
    .then((response) => response.json())
    .then((data) => {
      renderActions(data);
    });
}

loadActions();
// Zeigt die Benutzerverwaltung nur für Administratoren an
fetch("/api/whoami")
  .then((response) => response.json())
  .then((user) => {
    if (user.role === "admin") {
      document.getElementById("users-link").style.display = "inline";
    }
  });