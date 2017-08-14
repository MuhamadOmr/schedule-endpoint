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
    type: String,
    required: true

  },

  name:{
    type: String,
    required: true

  },

  schedule: {
    time:{
      type: Date,
      required: true

    }
  },

  pushData: {
    msg: {
      type: String

  }
  },

  sent:{
    type: Boolean,
    default: false
  }

}, { emitIndexErrors: true });

scheduleSchema.index({ app_id: 1 , name:1 } , { unique: true });


var Schedule = mongoose.model('schedule' , scheduleSchema);

module.exports = {Schedule: Schedule} ;