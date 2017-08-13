var restify = require('restify'),
    jobs = require('./api/jobs');



// create Server
var server = restify.createServer();

server.use(restify.plugins.bodyParser());


server.get('/', jobs.createSchedule);



server.listen(8088, function() {
  console.log('%s listening at %s', server.name, server.url);
});
