var Schedule = require("../DB/schema").Schedule;

//the module pattern
jobs = function(){


  function checkIfJson(req){
    return new Promise(function(resolve, reject) {
      if(!req.is('application/json') ){
        reject('please send json type request');
      }else{
        resolve("checked");
      }
    });
  }

  // create a schedule

  function createSchedule(req , res ,next){
     appID = req.body.appID,
        name = req.body.name,
        time = new Date(req.body.scheduleTime),
        pushData = req.body.data;

        // check for request body type
    return checkIfJson(req)
    .then(()=>{
      oneSchedule = new Schedule({
        app_id: appID ,
        name: name,
        schedule: {time: time},
        pushData: {msg: pushData.msg}
      });

      return oneSchedule.save();

    }).then((result)=>{

        return res.send(result);

      })
    .catch((e)=>{

      if (e.name === 'MongoError' && e.code === 11000) {
            return res.send(400,'There was a duplicate key error');

          }
          else if (e.name === "ValidationError") {
            return res.send(400,'Invalid Json');
          }
          res.send(400 , e);

    });

  }

  function listAllSchedules(req , res ,next){

    Schedule.find({}).then((results)=>{

      if(results.length === 0){
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

    checkIfJson(req).then(()=>{

    return Schedule.findById(id);

    })
    .then((result)=>{

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


    // remove from the database then return the deleted record
    return Schedule.findByIdAndRemove(id)
    .then((result)=>{

      if(result === null){
        return res.send(404 , "not found")
      }

     return res.send(result);

    }).catch((e)=>{

      if(e.name ==="CastError"){

        return res.send(400 , "invalid id")
      }

      return res.send(400 , e);
    })

  }

  function updateScheduleById(req , res ,next){

    var id = req.params.id,
        data = req.body;
    checkIfJson(req).then(()=>{

    // update the db then check for the sent property
    // if changed to TRUE
      // if True -- delete the record
    return Schedule.findByIdAndUpdate(id, data,{new: true});
    })
    .then((record)=>{

    //  console.log(record);
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
    listScheduleById: listScheduleById,
    checkIfJson: checkIfJson

  }
};

module.exports = jobs();