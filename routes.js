
var controllers = require('./controllers');


var teams = controllers.teams;


module.exports = function (app) {

    app.get('/teams',                teams.all);
    app.get('/teams/:division',      teams.all);
    app.get('/teams/:division/:id',  teams.get);
};