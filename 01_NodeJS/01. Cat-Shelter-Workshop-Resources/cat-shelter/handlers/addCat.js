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

            let addCatHTML = "";
            addCatHTMLStream.on("data", (data) => {
                addCatHTML += data;
            });

            addCatHTMLStream.on("end", () => {
                filePath = path.normalize(path.join(__dirname, "../data/breeds.json"));
                const breedsStream = fs.createReadStream(filePath, {encoding: "utf-8"}); 
                let breedsData = "";
                breedsStream.on("data", (data) => {
                    breedsData += data;
                });
                let breeds;
                breedsStream.on("end", () => {
                    breeds = JSON.parse(breedsData);

                    let breedsOptions = "";
                    breeds.map(breed => {
                        return breedsOptions += `<option value="${breed}">${breed}</option>`;
                    });
                    console.log(breedsOptions);
                    let output = addCatHTML.replace("{{breeds}}", breedsOptions);
    
                    res.write(output);
                    res.end();
                });
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