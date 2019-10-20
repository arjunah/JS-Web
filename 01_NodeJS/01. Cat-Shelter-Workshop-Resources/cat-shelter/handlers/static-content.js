const fs = require("fs");
const path = require("path");
const url = require("url");

function getContentType (url) {
    if (url.endsWith("css")) {
        return "text/css";
    } else if (url.endsWith("jpg") || url.endsWith("jpeg")) {
        return "image/jpeg";
    } else if (url.endsWith("ico")) {
        return "image/x-icon";
    } else if (url.endsWith("png")) {
        return "image/png";
    } else if (url.endsWith("html")) {
        return "text/html";
    } else if (url.endsWith("js")) {
        return "text/javascript";
    }
}

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    const pathName = url.parse(req.url).path;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, `../${pathName}`));
            const fileStream = fs.createReadStream(filePath);

            fileStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": getContentType(pathName) 
                });
            });

            fileStream.on("data", (data) => {
                res.write(data);
            });

            fileStream.on("end", () => {
                res.end();
            });

            fileStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
    }

}