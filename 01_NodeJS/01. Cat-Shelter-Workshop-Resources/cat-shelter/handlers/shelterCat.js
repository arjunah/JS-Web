const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
    const method = req.method;
    let filePath;
    let index;
    switch (method) {
        case "GET":
            filePath = path.normalize(path.join(__dirname, "../views/shelterCat.html"));
            const   shelterCatHTMLStream = fs.createReadStream(filePath);

            shelterCatHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            let shelterCatHTML = "";
            shelterCatHTMLStream.on("data", (data) => {
                shelterCatHTML += data;
            });

            shelterCatHTMLStream.on("end", () => {

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

                    let catForm = `
                        <form action="/shelterCat/${cat.id}" method="POST" class="cat-form">
                            <h2>Shelter the cat</h2>
                            <img src="/content/images/${cat.image}" alt="${cat.breed}">
                            <label for="name">Name</label>
                            <input type="text" id="name" value="${cat.name}" disabled>
                            <label for="description">Description</label>
                            <textarea id="description" disabled>${cat.description}</textarea>
                            <label for="group">Breed</label>
                            <select id="group" disabled>
                                <option value="${cat.breed}">${cat.breed}</option>
                            </select>
                            <button>SHELTER THE CAT</button>
                        </form>
                    `
                    let output = shelterCatHTML.replace("{{shelterForm}}", catForm);

                    res.write(output);
                    res.end();
                });
            });

            shelterCatHTMLStream.on("error", (error) => {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                console.log(error);
            });
            break;

        case "POST":
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

                let index = cats.indexOf(cat);

                cats.splice(index, 1);

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
    }
}