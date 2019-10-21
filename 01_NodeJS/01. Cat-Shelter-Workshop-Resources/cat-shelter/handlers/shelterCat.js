const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/shelterCat.html"));
            const   shelterCatHTMLStream = fs.createReadStream(filePath);

            shelterCatHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            shelterCatHTMLStream.on("data", (data) => {
                res.write(data);
            });

            shelterCatHTMLStream.on("end", () => {
                res.end();
            });

            shelterCatHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
    }
}