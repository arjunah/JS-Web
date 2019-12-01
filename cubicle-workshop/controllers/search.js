const { 
    getCubes, 
    validateSearch, 
    searchCubes, 
    clientErrorHandler
} = require("../config/helpers");

module.exports = async function search (req, res) {
    const user = req.user;
    const { search, from, to } = req.body;
    
    try {
        await validateSearch(from, to);
    } catch (error) {
        clientErrorHandler(res, "index", error, { user });
        return;
    }

    let allCubes;
    try {
        allCubes = await getCubes();
    } catch (error) {
        clientErrorHandler(res, null, error);
    }

    const searchResult = searchCubes(search, from, to, allCubes);

    res.render("index", { user, cubes: searchResult });
}