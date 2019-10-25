const fs = require("fs");
const qs = require("querystring");
const path = require("path");

module.exports = (req, res) => {
    let filePath;
    let formData = "";

    req.on("data", (data) => {
        formData += data;
    });

    req.on("end", () => {
        let body = qs.parse(formData);

        const searchString = body.search.toLowerCase();

        let catsData = "";
        filePath = path.normalize(path.join(__dirname, "../data/cats.json"));
        const catsReadStream = fs.createReadStream(filePath, {encoding: "utf-8"});

        catsReadStream.on("data", (data) => {
            catsData += data;
        });

        catsReadStream.on("end", () => {
            let cats = JSON.parse(catsData);

            let searchResult = [];

            cats.forEach(cat => {
                if (cat.name.toLowerCase().includes(searchString) || 
                cat.description.toLowerCase().includes(searchString) || 
                cat.breed.toLowerCase().includes(searchString)) {
                    searchResult.push(cat);
                }
            });

            filePath = path.normalize(path.join(__dirname, "../views/home/index.html"));
            const   homeHTMLStream = fs.createReadStream(filePath);

            homeHTMLStream.once("data", () => {
                res.writeHead(200, {
                    "Content-Type": "text/html" 
                });
            });

            let homeHTML = "";
            homeHTMLStream.on("data", (data) => {
                homeHTML += data;
            });

            homeHTMLStream.on("end", () => {
                let catsList = "";
                searchResult.map(cat => {
                    return catsList += `
                        <li>
                            <img src="/content/images/${cat.image}" alt="${cat.breed}">
                            <h3>${cat.name}</h3>
                            <p><span>Breed: </span>${cat.breed}</p>
                            <p><span>Description: </span>${cat.description}</p>
                            <ul class="buttons">
                                <li class="btn edit"><a href="/editCat/${cat.id}">Change Info</a></li>
                                <li class="btn delete"><a href="/shelterCat/${cat.id}">New Home</a></li>
                            </ul>
                        </li>
                    `
                });

                let output;
                if (catsList === "") {
                    output = homeHTML.replace("{{cats}}", "No cat found!");
                } else {
                    output = homeHTML.replace("{{cats}}", catsList);
                }
                
                res.write(output);
                res.end();
            });

        });
    });
}