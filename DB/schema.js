var mongoose = require('mongoose');

// notification Schema
// notificationSchema = new mongoose.Schema({
//
//   msg: {
//     type: String
//   }
//
// });

// Schedule Schema
scheduleSchema = new mongoose.Schema({

  app_id:{
    type: String

  },

  name:{
    type: String
  },

  schedule: {
    time:{
      type: Date,
    }
  },

  pushData: {
    msg: {
      type: String,
    }
  }


});

var Schedule = mongoose.model('schedule' , scheduleSchema);

module.exports = {Schedule: Schedule} ;