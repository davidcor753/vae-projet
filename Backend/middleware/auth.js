// Prüft, ob der Benutzer angemeldet ist
function checkLogin(req, res, next) {
    if (req.session.user) {
        return next();
    }

    return res.redirect("/login.html");
}

// checkt den Zugriff nur Benutzern mit der Rolle admin
function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    }

    return res.status(403).json({ error: "not allowed" });
}

// Export der Middleware für andere Dateien
module.exports = {
    checkLogin,
    checkAdmin,
};