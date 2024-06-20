const mongoose = require("mongoose");

const schema = mongoose.Schema;

const accommodationSchema = new schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    accommodation:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    estprice:{
        type:Number,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
})

const accommodations = mongoose.model("Accommodations",accommodationSchema);

module.exports = accommodations;