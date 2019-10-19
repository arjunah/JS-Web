const { port, homeURL, addBreedURL, addCatURL, shelterCatURL, editCatURL } = require("./config/config");
const http = require("http");

const app = http.createServer((req, res) => {
    res.write("Hi!");
    res.end();
});

app.listen(port);
