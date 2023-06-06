var petModel = require("../models/petModel");

var sessoes = [];

function test(req, res) {
    console.log("ENTRAMOS NA petContro");
    res.json("ESTAMOS FUNCIONANDO!");
}

module.exports = {
    test
}