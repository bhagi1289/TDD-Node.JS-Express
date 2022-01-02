const mongoose = require("mongoose");

const TDDSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        required: true
    }
});

const TDDModel = mongoose.model("TDD", TDDSchema);

module.exports = TDDModel;