var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shuttleTimesSchema = new Schema({
  SUN: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  MON: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  TUE: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  WED: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  THU: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  FRI: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
  SAT: {
    bundang: [new Schema({ title: String, isAvailable: Boolean })],
    bangbae: [new Schema({ title: String, isAvailable: Boolean })]
  },
});

module.exports = mongoose.model("shuttleTimes", shuttleTimesSchema);
