var restify = require('restify'),
    jobs = require('./api/jobs'),
    connection = require("./db");



// create Server
var server = restify.createServer();

server.use(restify.plugins.bodyParser());


server.post('schedule', (req, res , next)=>{

  jobs.createSchedule(req).then((response)=>{


    return res.send(response);

  }).catch((e)=>{

    if (e.name === 'MongoError' && e.code === 11000) {
      return res.send(400,'There was a duplicate key error');

    }
    else if (e.name === "ValidationError") {
      return res.send(400,'Invalid Json');
    }
    res.send(400 , e);
  });

});

server.get('schedule', jobs.listAllSchedules);

server.get('schedule/:id', jobs.listScheduleById);

server.del('schedule/:id', jobs.deleteSchedule);

server.patch('schedule/:id', jobs.updateScheduleById);


server.listen(8088, function() {
  console.log('%s listening at %s', server.name, server.url);
});
