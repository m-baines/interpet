const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        timeCreated: {type: Date, required: true},
        energy: {type: Number, required: true, max: 100},
        happiness: {type: Number, required: true, max: 100},
        cleanliness: {type: Boolean},
        sickness: {type: Boolean},
        userId: {type:Schema.Types.ObjectId, ref: "User", required: true}

    }
)

module.exports = mongoose.model("Pet", PetSchema)