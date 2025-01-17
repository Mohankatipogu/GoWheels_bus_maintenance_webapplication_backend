var mongoose = require("mongoose");

var BusExpenseSchema = mongoose.Schema({
  bus_id: { type: String},
  route: {
    start: { type: String},
    end: { type: String},
    distance_km: { type: Number},
  },
  date: { type: Date, default: Date.now },
  driver: {
    name: { type: String, },
    salary: { type: Number,  },
    email: { type: String, },
    advance: { type: Number, default: 0 },
    mobile: { type: Number, },
    address: { type: String },
    image: { type: String },
  },
  expenses: 
    {
      amount: { type: Number},
      details: { type: String},
      Driver_name: { type: String},
      Bus_Number: { type: String},
      image: { type: String },
    },
  total_amount: { type: Number },
  description: { type: String },
  remarks: { type: String },
});

var BusExpense = mongoose.model("BusExpense", BusExpenseSchema);

module.exports = BusExpense;
