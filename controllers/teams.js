
var db   = require('../db');

/*
 * GET all teams in a division
 */
exports.all = function (req, res, next) {

    var division = req.param('division') || 'open';

    var collection = db.get('teams');

    var query  = { division : division },
        fields = [ 'id', 'name' ];

    collection.find(query, fields, function (err, teams) {
        res.json(teams);
    });
};


/**
 * GET a particular team in a division
 */
exports.get = function (req, res, next) {

    var division = req.param('division'),
        id       = req.param('id');

    if (!division || !id) {
        return res.send(400);
    }

    var collection = db.get('teams');

    var query  = { division : division,
                   id       : id };

    collection.find(query, function (err, team) {
        res.json(team);
    });
};