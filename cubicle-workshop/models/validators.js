function validateURLProtocol (url) {
    return (url.startsWith("http://") || url.startsWith("https://")) ? true : false;
}

function validatePassword (password) {
    return /^(?=.*\d)([a-zA-Z0-9]){8,}$/.test(password);
}

module.exports = {
    validateURLProtocol,
    validatePassword
}