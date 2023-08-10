const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(

{
title : {
  type: String,
  required: true,
},
content: {
  type: String,
  required: true, 
  default: ' '
},
},
{ timestamps: true },
)

module.exports = mongoose.model('board' , boardSchema);