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

    oneSchedule.save().then((result)=>{

      res.send(result);
      next();
    }).catch((e)=>{
      res.send(e);
    })

  }

  function listAllSchedules(req , res ,next){

    Schedule.find({}).then((results)=>{

      res.send(results);
      next();
    }).catch((e)=>{
      res.send(e);
    })

  }

  function listScheduleById(req , res ,next){

    var id = req.params.id;

    Schedule.findById(id).then((result)=>{

      res.send(result);
      next();
    }).catch((e)=>{
      res.send(e);
    })

  }

  function deleteSchedule(req , res ,next){

    var id = req.params.id;

    // save in the database
    Schedule.remove({_id: id}).then((results)=>{

      res.send(results);
      next();
    }).catch((e)=>{
      res.send(e);
    })

  }

  function updateScheduleById(req , res ,next){

    var id = req.params.id,
        data = req.body;

    // update the db then check for the sent property
    // if changed to TRUE
      // if True -- delete the record
    Schedule.findByIdAndUpdate(id, data,{new: true})
    .then((record)=>{

      if(record.sent){
        deleteSchedule(req , res);
      }
      else{
        res.send(record);
        next();
      }

    })
    .catch((e)=>{
      res.send(e);
    })

  }


  return {
    createSchedule: createSchedule,
    listAllSchedules: listAllSchedules,
    deleteSchedule: deleteSchedule,
    updateScheduleById: updateScheduleById,
    listScheduleById: listScheduleById

  }
};

module.exports = jobs();