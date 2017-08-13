var Schedule = require("../DB/schema").Schedule;

//the module pattern
jobs = function(){

  // create a schedule

  function createSchedule(req , res ,next){
    var appID = req.body.appID,
        name = req.body.name,
        time = new Date(req.body.scheduleTime),
        pushData = req.body.data;

    // create the schedule from the model
    oneSchedule = new Schedule({
      app_id: appID ,
      name: name,
      schedule: {time: time},
      pushData: {msg: pushData.msg}
    });

    // save in the database
    oneSchedule.save().then((result)=>{

      res.send(result);
      next();
    })

  }




  return {
    createSchedule: createSchedule,

  }
};

module.exports = jobs();