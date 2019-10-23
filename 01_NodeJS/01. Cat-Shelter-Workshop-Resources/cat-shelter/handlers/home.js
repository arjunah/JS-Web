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

            let homeHTML = "";
            homeHTMLStream.on("data", (data) => {
                homeHTML += data;
            });

            homeHTMLStream.on("end", () => {
                let catsList = "";

                let catsData = "";
                filePath = path.normalize(path.join(__dirname, "../data/cats.json"));
                const catsReadStream = fs.createReadStream(filePath, {encoding: "utf-8"});

                catsReadStream.on("data", (data) => {
                    catsData += data;
                });

                catsReadStream.on("end", () => {
                    let cats = JSON.parse(catsData);
                    cats.map(cat => {
                        return catsList += `
                            <li>
                                <img src="/content/images/${cat.image}" alt="${cat.breed}">
                                <h3>${cat.name}</h3>
                                <p><span>Breed: </span>${cat.breed}</p>
                                <p><span>Description: </span>${cat.description}</p>
                                <ul class="buttons">
                                    <li class="btn edit"><a href="/editCat">Change Info</a></li>
                                    <li class="btn delete"><a href="/shelterCat">New Home</a></li>
                                </ul>
                            </li>
                        `
                    });

                    let output = homeHTML.replace("{{cats}}", catsList);

                    res.write(output);
                    res.end();
                });
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