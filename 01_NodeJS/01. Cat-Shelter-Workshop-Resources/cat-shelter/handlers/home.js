const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/home/index.html"));
            const   homeHTMLStream = fs.createReadStream(filePath);

            homeHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            homeHTMLStream.on("data", (data) => {
                res.write(data);
            });

            homeHTMLStream.on("end", () => {
                res.end();
            });

            homeHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
    }

}