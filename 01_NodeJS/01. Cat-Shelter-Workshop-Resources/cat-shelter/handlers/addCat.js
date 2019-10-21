const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/addCat.html"));
            const   addCatHTMLStream = fs.createReadStream(filePath);

            addCatHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            addCatHTMLStream.on("data", (data) => {
                res.write(data);
            });

            addCatHTMLStream.on("end", () => {
                res.end();
            });

            addCatHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
    }
}