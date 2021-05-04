const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        name: {type: String, required: true, max: 100},
        timeCreated: {type: Date, required: true},
        energy: {type: Number, required: true, max: 100},
        happiness: {type: Number, required: true, max: 100},
        dirty: { status: { type: Boolean, required: true},
                 time: { type: Date }
        },
        sick: { status: { type: Boolean, required: true },
                time: { type:Date }
        },
        dead: { status: { type: Boolean, required: true },
                time: { type:Date }
        },
        userId: {type:Schema.Types.ObjectId, ref: "User", required: true}
    }
)

module.exports = mongoose.model("Pet", PetSchema)