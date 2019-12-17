module.exports = function about (req, res) {
    const user = req.user;
    res.render("about", { user });
}