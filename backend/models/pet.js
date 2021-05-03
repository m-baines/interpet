const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        timeCreated: {type: Date, required: true},
        timeOfDeath: {type: Date},
        energy: {type: Number, required: true, max: 100},
        happiness: {type: Number, required: true, max: 100},
        cleanliness: {type: Boolean, required: true},
        sickness: {type: Boolean, required: true},
        dead: {type: Boolean, required: true},
        userId: {type:Schema.Types.ObjectId, ref: "User", required: true}
    }
)

module.exports = mongoose.model("Pet", PetSchema)