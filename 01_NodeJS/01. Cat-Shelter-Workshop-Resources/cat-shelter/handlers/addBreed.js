const fs = require("fs");
const path = require("path");
const qs = require("querystring");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/addBreed.html"));
            const   addBreedHTMLStream = fs.createReadStream(filePath);

            addBreedHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            addBreedHTMLStream.on("data", (data) => {
                res.write(data);
            });

            addBreedHTMLStream.on("end", () => {
                res.end();
            });

            addBreedHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;
        case "POST":
            let formData = "";

            req.on("data", (data) => {
                formData += data;
            });

            req.on("end", () => {
                let body = qs.parse(formData);
                let breedsData = "";
                filePath = path.normalize(path.join(__dirname, "../data/breeds.json"));
                const breedsStream = fs.createReadStream(filePath, {encoding: "utf-8"});

                breedsStream.on("data", (data) => {
                    breedsData += data;
                });
            
                let breedsUpdated;
                breedsStream.on("end", () => {
                    let breeds = JSON.parse(breedsData);
                    breeds.push(body.breed);
                    breedsUpdated = JSON.stringify(breeds);

                    let breedsWrite = fs.createWriteStream(filePath, {encoding: "utf-8"});
                    breedsWrite.write(breedsUpdated);
                    breedsWrite.end();
                    breedsWrite.on("error", (error) => {
                        res.writeHead(404, {
                            "Content-Type": "text/plain"
                        });
                        console.log(error);
                    });
                });

                breedsStream.on("error", (error) => {
                    res.writeHead(404, {
                        "Content-Type": "text/plain"
                    });
                    console.log(error);
                });

                res.writeHead(302, {
                    "Location": "/"
                });
                res.end();
            });  
    }
}