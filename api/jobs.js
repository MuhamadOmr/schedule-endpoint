var Schedule = require("../DB/schema").Schedule;

//the module pattern
jobs = function(){

  // create a schedule

  function checkIfJson(req){
    // check for request body type
    if(!req.is('application/json') ){

      var err = new Error('please send json type request');
      return res.send(400, err.message);
    }

  }


  function createSchedule(req , res ,next){
    var appID = req.body.appID,
        name = req.body.name,
        time = new Date(req.body.scheduleTime),
        pushData = req.body.data;

        // check for request body type
    checkIfJson(req);

    //create the schedule from the model
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

      if (e.name === 'MongoError' && e.code === 11000) {
        return res.send(400 , 'There was a duplicate key error');

      }
      else if (e.name === "ValidationError") {
        return res.send(400 ,'Invalid Json');
      }
      //console.log(e.name);
      return res.send(e);


    });

  }

  function listAllSchedules(req , res ,next){

    Schedule.find({}).then((results)=>{

      if(!results.lenght){
        return res.send(404 , "couldn't find any schedule");
      }

      res.send(results);
      next();

    }).catch((e)=>{

      return res.send(e);

    })

  }

  function listScheduleById(req , res ,next){

    var id = req.params.id;

    checkIfJson(req);

    Schedule.findById(id).then((result)=>{

      if(!result){
        return res.send(400 , "couldn't find a schedule");
      }


      res.send(result);
      next();


    }).catch((e)=>{

      if(e.name ==="CastError"){

        return res.send(400 , "invalid id")
      }
      return res.send(e);


    })

  }

  function deleteSchedule(req , res ,next){

    var id = req.params.id;

    checkIfJson(req);

    // save in the database
    Schedule.remove({_id: id}).then((results)=>{

      if(!results.result.n){
        res.send(400,"the schedule is not in the database")
      }

     return res.send(results);

    }).catch((e)=>{

      if(e.name ==="CastError"){

        return res.send(400 , "invalid id")
      }

      console.log(e);
    })

  }

  function updateScheduleById(req , res ,next){

    var id = req.params.id,
        data = req.body;
    checkIfJson(req);

    // update the db then check for the sent property
    // if changed to TRUE
      // if True -- delete the record
    Schedule.findByIdAndUpdate(id, data,{new: true})
    .then((record)=>{

      console.log(record);
      if(!record){
        return res.send(400 , "couldn't find a schedule");
      }


      if(record.sent){

        deleteSchedule(req , res);
      }
      else{
        res.send(record);
        next();
      }

    })
    .catch((e)=>{
      console.log(e);

      if(e.name ==="CastError"){

        return res.send(400 , "invalid id")
      }
      res.send(e);
      next();
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