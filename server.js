var restify = require('restify'),
    jobs = require('./api/jobs'),
    connection = require("./db");



// create Server
var server = restify.createServer();

server.use(restify.plugins.bodyParser());


server.post('schedule', jobs.createSchedule);


server.get('schedule', jobs.listAllSchedules);

server.get('schedule/:id', jobs.listScheduleById);

server.del('schedule/:id', jobs.deleteSchedule);

server.patch('schedule/:id', jobs.updateScheduleById);


server.listen(8088, function() {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
