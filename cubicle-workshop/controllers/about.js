module.exports = function about (req, res, next) {
    res.render("about", { user: req.user });
}