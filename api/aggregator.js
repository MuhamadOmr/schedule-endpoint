var Schedule = require("../DB/schema").Schedule,
    http = require('http'),
    jobs = require('./api/jobs');


aggregator = function (){

  function checkSchedule () {

    var port = 5000;
    var server_host = '13.92.199.68';

    var options = {
      host: server_host,
      port: port,
      path: '/push/all',
      method: 'POST',
      headers: {
        "x-pushbots-appid": req.headers["x-pushbots-appid"],
        "x-pushbots-secret": req.headers["x-pushbots-secret"],
        "content-type": "application/json"
      }
    };

    Schedule.find({sent: false}).then((results)=>{

      if(results.length > 0){
        results.forEach(function(result){
          if(result.time.getTime() >= new Date().getTime()) {

            scheduleObject = JSON.stringify(result.pushData);

            id = result._id;

            var request = http.request(options, function(response) {

            });

            // send the request to the server with the pushData of the schedule
            request.write(scheduleObject);



            // Update the schedule database ... then delete the the record
              return Schedule.findByIdAndUpdate(id, {sent: true},{new: true})
                  .then((record)=>{
                //  console.log(record);
                if(!record){
                  return console.log("couldn't find a schedule");
                }


                if(record.sent){

                  Schedule.findByIdAndRemove(record._id).then((result)=>{

                    if(result === null){
                      return console.log("not found");
                    }

                    return console.log(result) ;

                  }).catch((e)=>{

                    if(e.name ==="CastError"){

                      return console.log("invalid id")
                    }

                    return console.log(e);
                  })

                }
              })

          }

        })

      }
    })
  }

  return {

    checkSchedule: checkSchedule,
  }

};

module.exports = aggregator();