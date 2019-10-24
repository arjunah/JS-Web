const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

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

        case "POST":
            let form = new formidable.IncomingForm();

            form.parse(req, (error, fields, files) => {

                if (error) {
                    console.log(error);
                };

                let oldPath = files.upload.path;
                let newPath = path.normalize(path.join(__dirname, "../content/images/" + files.upload.name));

                const copyImg = (oldPath, newPath) => {
                    return new Promise ((resolve, reject) => {
                        fs.copyFile(oldPath, newPath, (error) => {
                            if (error) {
                                reject(error);
                            }
                        })
                        resolve();
                    });
                };

                const delImg = (oldPath) => {
                    return new Promise ((resolve, reject) => {
                        fs.unlink(oldPath, (error) => {
                            if (error) {
                                reject(error);
                            }
                        })
                        resolve();
                    });
                };

                copyImg(oldPath, newPath).then(res => delImg(oldPath));

                let catsData = "";
                filePath = path.normalize(path.join(__dirname, "../data/cats.json"));
                const catsReadStream = fs.createReadStream(filePath, {encoding: "utf-8"});

                catsReadStream.on("data", (data) => {
                    catsData += data;
                });

                catsReadStream.on("end", () => {
                    let cats = JSON.parse(catsData);
                    let cat = {
                        id: cats.length + 1,
                        ...fields,
                        image: files.upload.name
                    }
                    cats.push(cat);

                    let catsUpdated = JSON.stringify(cats);

                    let catsWrite = fs.createWriteStream(filePath, {encoding: "utf-8"});
                    catsWrite.write(catsUpdated);
                    catsWrite.end();
                    catsWrite.on("finish", () => {
                        res.writeHead(302, {
                            "Location": "/"
                        });
                        res.end();
                    })
                    catsWrite.on("error", (error) => {
                        res.writeHead(404, {
                            "Content-Type": "text/plain"
                        });
                        console.log(error);
                    });
                });
            });    
    }
}