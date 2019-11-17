const { getCubes, validateSearch, searchCubes } = require("../config/helpers");

module.exports = async function search (req, res, next) {
    
    const { search, from, to } = req.body;
    const validated = validateSearch(res, from, to);

    if (validated) {
        const allCubes = await getCubes();
        const cubes = searchCubes(search, from, to, allCubes);
        
        res.render("index", { cubes });
    } else {
        res.redirect("/");
    }
}