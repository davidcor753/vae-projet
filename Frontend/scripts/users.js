const usersTableBody = document.querySelector("#users-table tbody");
const userForm = document.getElementById("user-form");
const userName = document.getElementById("user-name");
const userPassword = document.getElementById("user-password");
const userRole = document.getElementById("user-role");
const userMessage = document.getElementById("user-message");

// Zeigt die geladenen Benutzer in der Tabelle an
function renderUsers(data) {
  usersTableBody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>
        <select class="role-select" data-id="${user.id}">
          <option value="user" ${user.role === "user" ? "selected" : ""}>User</option>
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
        </select>
      </td>
      <td>
        <button class="delete-user-btn" data-id="${user.id}">
          Löschen
        </button>
      </td>
    `;

    const roleSelect = row.querySelector(".role-select");
    const deleteButton = row.querySelector(".delete-user-btn");

    // Ändert die Rolle des ausgewählten Benutzers
    roleSelect.addEventListener("change", () => {
      const userData = {
        role: roleSelect.value,
      };

      fetch(`/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            loadUsers();
            userMessage.textContent = "Benutzerrolle wurde aktualisiert.";
          } else {
            loadUsers();
            userMessage.textContent =
              "Benutzerrolle konnte nicht aktualisiert werden.";
          }
        })
        .catch(() => {
          userMessage.textContent = "Ein Fehler ist aufgetreten.";
        });
    });

    // Löscht den ausgewählten Benutzer nach Bestätigung
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm(
        "Möchtest du diesen Benutzer wirklich löschen?",
      );

      if (confirmed) {
        fetch(`/users/${user.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              loadUsers();
              userMessage.textContent = "Benutzer wurde gelöscht.";
            } else {
              userMessage.textContent =
                "Benutzer konnte nicht gelöscht werden.";
            }
          })
          .catch(() => {
            userMessage.textContent = "Ein Fehler ist aufgetreten.";
          });
      }
    });

    usersTableBody.appendChild(row);
  });
}

// Lädt die Benutzer aus dem Backend
function loadUsers() {
  fetch("/users")
    .then((response) => response.json())
    .then((data) => {
      renderUsers(data);
    })
    .catch(() => {
      userMessage.textContent = "Ein Fehler ist aufgetreten.";
    });
}

loadUsers();

// Erstellt einen neuen Benutzer
userForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userData = {
    name: userName.value,
    password: userPassword.value,
    role: userRole.value,
  };

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loadUsers();

        userName.value = "";
        userPassword.value = "";
        userRole.value = "user";

        userMessage.textContent = "Benutzer wurde erstellt.";
      } else {
        userMessage.textContent = "Benutzer konnte nicht erstellt werden.";
      }
    })
    .catch(() => {
      userMessage.textContent = "Ein Fehler ist aufgetreten.";
    });
});
