# Inventarverwaltung

Eine moderne Webanwendung zur Verwaltung und Verfolgung von Geräten und Inventar. Das System bietet eine vollständige CRUD-Funktionalität, eine Historie und eine rollenbasierte Benutzerverwaltung.

## Funktionen

* **Geräteverwaltung (CRUD):** Erfassen, Anzeigen, Bearbeiten und Löschen von Inventargeräten.
* **Inventarhistorie:** Nachverfolgung der Änderungen am Inventar durch die Aktionen Erstellen, Bearbeiten und Löschen.
* **Status-Statistik:** Übersicht über die Anzahl der Geräte nach ihrem aktuellen Status.
* **Benutzerverwaltung:** Login-System mit rollenbasierter Zugriffskontrolle (**Admin** und **User**).

## Verwendete Technologien

* **Backend:** Node.js und Express
* **Datenbank:** MySQL
* **Frontend:** HTML, CSS und JavaScript
* **Authentifizierung:** express-session und bcrypt
* **Entwicklungsumgebung:** Visual Studio Code
* **Versionsverwaltung:** Git und GitHub

## Projektstruktur

Das Projekt ist in Backend, Frontend und Datenbank aufgeteilt.

- `Backend/` – Server, Routen, Middleware und Datenbankverbindung
- `Frontend/` – HTML-Seiten, JavaScript-Dateien und CSS
- `database/` – SQL-Dateien für Datenbankstruktur und Demo-Daten
- `database/inventaire_1.sql` – SQL-Script zur Erstellung der Datenbankstruktur
- `database/seed.sql` – Demo-Daten für die Datenbank
- `package.json` – Abhängigkeiten und Konfiguration des Node.js-Projekts
- `README.md` – Beschreibung und Anleitung zur Verwendung des Projekts

## Voraussetzungen

Für die Ausführung der Anwendung werden folgende Komponenten benötigt:

* Node.js
* MySQL
* npm
* Ein Webbrowser

## Installation

1. Repository klonen:

   ```bash
   git clone https://github.com/davidcor753/vae-projet.git
   ```

2. In den Projektordner wechseln:

   ```bash
   cd vae-projet
   ```

3. Die benötigten Node.js-Abhängigkeiten installieren:

   ```bash
   npm install
   ```

4. Die MySQL-Datenbank erstellen.

   Zuerst das SQL-Script `database/inventaire_1.sql` in MySQL ausführen. Dieses Script erstellt die Datenbankstruktur mit den benötigten Tabellen und Beziehungen.

5. Die Demo-Daten importieren.

   Anschließend das SQL-Script `database/seed.sql` in MySQL ausführen. Dieses Script fügt die Demo-Daten in die Datenbank ein.

6. Die `.env`-Datei im Backend-Ordner konfigurieren.

   Beispiel:

   ```env
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=<Session-Secret>
   DB_HOST=localhost
   DB_USER=<Datenbankbenutzer>
   DB_PASSWORD=<Datenbankpasswort>
   DB_NAME=inventaire_1
   ```

7. In den Backend-Ordner wechseln:

   ```bash
   cd Backend
   ```

8. Den Server starten:

   ```bash
   node server.js
   ```
## Anwendung öffnen

Nach dem Start des Servers kann die Anwendung im Browser über folgende Adresse geöffnet werden:

```text
http://localhost:3000/login.html
```

Die Anmeldung erfolgt mit einem Benutzer, der in der Datenbank hinterlegt ist.
Admin:
Login: admin
Passwort: admin

Normalen user:
Login: test
Passwort: test

Nach erfolgreicher Anmeldung wird die Inventarverwaltung geöffnet.
## Benutzerrollen



* **User:** Kann die Inventarverwaltung und die Inventarhistorie verwenden.
* **Admin:** Verfügt zusätzlich über Zugriff auf die Benutzerverwaltung und kann Benutzer erstellen, Rollen ändern und Benutzer löschen.

