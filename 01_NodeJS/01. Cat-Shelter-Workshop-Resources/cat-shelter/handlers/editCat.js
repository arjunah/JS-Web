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

                    let breedsOptions = "";
                    breeds.map(breed => {
                        return breedsOptions += `<option value="${breed}">${breed}</option>`;
                    });

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

                        let output = `
                            <form action="/editCat" method="POST" class="cat-form" enctype="multipart/form-data">
                                <h2>Edit Cat</h2>
                                <label for="name">Name</label>
                                <input type="text" id="name" value="${cat.name}">
                                <label for="description">Description</label>
                                <textarea id="description">${cat.description}</textarea>
                                <label for="image">Image</label>
                                <input type="file" id="image">
                                <label for="group">Breed</label>
                                <select id="group">
                                    ${breedsOptions}
                                </select>
                                <button>Edit Cat</button>
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
            
    }
}