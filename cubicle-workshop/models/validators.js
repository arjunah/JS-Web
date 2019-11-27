function validateURLProtocol (url) {
    return (url.startsWith("http://") || url.startsWith("https://")) ? true : false;
}

function validatePassword (password) {
    return /^(?=.*\d)([a-zA-Z0-9]){8,}$/.test(password);
}

function isUsernameUnique (username) {
    const user = this.constructor.findOne({ username });
    return user ? false : true;
}

module.exports = {
    validateURLProtocol,
    validatePassword,
    isUsernameUnique
}