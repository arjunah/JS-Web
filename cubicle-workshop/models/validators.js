function validateURLProtocol(url) {
    return (url.startsWith("http://") || url.startsWith("https://")) ? true : false
}

module.exports = {
    validateURLProtocol
}