module.exports = function notFound (req, res, next) {
    const user = req.user;
    res.render("404", { user });
} 