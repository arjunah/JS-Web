const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

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

            let editCatHTML = "";
            editCatHTMLStream.on("data", (data) => {
                editCatHTML += data;
            });

            editCatHTMLStream.on("end", () => {
                filePath = path.normalize(path.join(__dirname, "../data/breeds.json"));
                const breedsStream = fs.createReadStream(filePath, {encoding: "utf-8"}); 
                let breedsData = "";
                breedsStream.on("data", (data) => {
                    breedsData += data;
                });
                let breeds;
                breedsStream.on("end", () => {
                    breeds = JSON.parse(breedsData);

                    let catsData = "";
                    filePath = path.normalize(path.join(__dirname, "../data/cats.json"));
                    const catsReadStream = fs.createReadStream(filePath, {encoding: "utf-8"});

                    catsReadStream.on("data", (data) => {
                        catsData += data;
                    });

                    catsReadStream.on("end", () => {
                        let cats = JSON.parse(catsData);
                        let cat = cats.find(cat => {
                            return cat.id == req.url.split("/").pop();
                        });

                        let breedsOptions = "";
                        breeds.map(breed => {
                            if (cat.breed === breed) {
                                return breedsOptions += `<option value="${breed}" selected="selected">${breed}</option>`;
                            } else {
                                return breedsOptions += `<option value="${breed}">${breed}</option>`;
                            }
                        });

                        let output = `
                            <form action="/editCat/${cat.id}" method="POST" class="cat-form" enctype="multipart/form-data">
                                <h2>Edit Cat</h2>
                                <label for="name">Name</label>
                                <input name="name" type="text" id="name" value="${cat.name}">
                                <label for="description">Description</label>
                                <textarea name="description" id="description">${cat.description}</textarea>
                                <label for="image">Image</label>
                                <input name="upload" type="file" id="image">
                                <label for="group">Breed</label>
                                <select name="breed" id="group" selected="${cat.breed}">
                                    ${breedsOptions}
                                </select>
                                <button type="submit">Edit Cat</button>
                            </form>
                        `

                        res.write(editCatHTML.replace("{{editForm}}", output));
                        res.end()
                    });
                });   
            });

            editCatHTMLStream.on("error", (error) => {
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
                        });
                        resolve();
                    });
                };

                const delImg = (oldPath) => {
                    return new Promise ((resolve, reject) => {
                        fs.unlink(oldPath, (error) => {
                            if (error) {
                                reject(error);
                            }
                        });
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

                    let cat = cats.find(cat => {
                        return cat.id == req.url.split("/").pop();
                    });

                    const index = cats.indexOf(cat);

                    cat.name = fields.name;
                    cat.description = fields.description;
                    cat.breed = fields.breed;
                    cat.image = files.upload.name;

                    cats[index] = cat;
                    
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