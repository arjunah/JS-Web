module.exports = function about (req, res, next) {
    const user = req.user;
    res.render("about", { user });
}