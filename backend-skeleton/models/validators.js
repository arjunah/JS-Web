function validateURLProtocol (url) {
    return (url.startsWith("http://") || url.startsWith("https://")) ? true : false;
}

function validatePassword (password) {
    return /^(?=.*\d)([a-zA-Z0-9]){8,}$/.test(password);
}

async function isUsernameUnique (username) {
    let user;
    try {
        user = await this.constructor.findOne({ username });
    } catch (error) {
        if (error) {
            throw new Error (error);
        }
    }
    return user ? false : true;
 }

module.exports = {
    validateURLProtocol,
    validatePassword,
    isUsernameUnique
}