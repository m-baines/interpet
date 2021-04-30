const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        name: {type: String, required:true, max: 100},
        age: {type: Number, required: true},
        energy: {type: Number, required: true, max: 100},
        happiness: {type: Number, required: true, max:100},
        cleanliness: Boolean,
        sickness: Boolean,
        userId: {type:Schema.Types.ObjectId, ref: "User", required: true}

    }
)

module.exports = mongoose.model("Pet", PetSchema)