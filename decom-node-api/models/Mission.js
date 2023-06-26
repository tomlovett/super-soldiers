const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types

const MissionSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'can\'t be blank']},
  user_id: { type: ObjectId, ref: 'User'}, // index: true
  soldiers: [{ type: ObjectId, ref: 'Soldier'}],
}, {timestamps: true})

MissionSchema.virtual('id').get(function() { return this._id.toHexString() })
MissionSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Mission', MissionSchema)
