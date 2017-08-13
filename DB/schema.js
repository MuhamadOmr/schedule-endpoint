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
    type: String,
    unique: true
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
  },

  sent:{
    type: Boolean,
    default: false
  }

});

var Schedule = mongoose.model('schedule' , scheduleSchema);

module.exports = {Schedule: Schedule} ;