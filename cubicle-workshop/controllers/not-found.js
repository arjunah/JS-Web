module.exports = function notFound (req, res) {
    const user = req.user;
    res.render("404", { user });
} 