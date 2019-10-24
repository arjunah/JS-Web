const http = require("http");
const url = require("url");
const { port, URLs } = require("./config/config");
const handlers = require("./handlers")

const app = http.createServer((req, res) => {

    let route = url.parse(req.url).path;

    if (route.startsWith("/content")) {
        handlers.staticContent(req, res);
    } else if (route.startsWith("/editCat")) {
        handlers.editCat(req, res);
    } else {
        Object.keys(URLs).forEach(url => {
            if (URLs[url] === route) {
                route === "/" ? route = "/home" : route;
                handlers[route.slice(1)](req, res); 
            }
        });
    }
});

app.listen(port);
