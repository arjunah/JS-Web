const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/editCat.html"));
            const   editCatHTMLStream = fs.createReadStream(filePath);

            editCatHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            editCatHTMLStream.on("data", (data) => {
                res.write(data);
            });

            editCatHTMLStream.on("end", () => {
                res.end();
            });

            editCatHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
    }
}