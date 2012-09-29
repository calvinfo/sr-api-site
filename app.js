
/**
 * Module dependencies.
 */
var _ = require('underscore');

try {
    var conf = require('./conf');
    _.defaults(process.env, conf);
} catch (err) {
    console.log("Not using conf.json");
}


var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    routes  = require('./routes');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
