
var _     = require('underscore'),
    async = require('async'),
    conf  = require('../conf'),
    monk  = require('monk')(conf.mongo),
    api   = require('sr-api');


var divisions = ['open', 'mixed', 'womens'];

var teams = monk.get('teams');


var generate = function (division) {

    api.teams.all({ division : division }, function (err, results) {

        console.log(err, results);

        async.forEachSeries(results, function (team, cb) {

            api.teams.get(division, team.id, function (err, fullTeam) {

                fullTeam.division = division;

                save(fullTeam);
                cb();
            });
        });
    });
};



var save = function (team) {

    console.log('Saving team', team.name);
    teams.update({ id : team.id }, { $set : team }, { upsert : true });
};

generate('womens');