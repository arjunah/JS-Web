module.exports = function notFound (req, res, next) {
    res.render("404", { user: req.user });
} 