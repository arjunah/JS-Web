const dbConnector = require("./config/database");

dbConnector().then(() => {
    const config = require("./config/config");
    const app = require("express")();
    
    require("./config/express")(app);
    require("./config/routes")(app);
    
    app.listen(config.port, console.log(`Listening on port ${config.port}...`));
}).catch(error => console.log(error));