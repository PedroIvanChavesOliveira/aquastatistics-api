const mongoose = require('mongoose');

const DeskParametersSchema = new mongoose.Schema(
  {
    systemId: { type: String, require: true },
    alkalinity: { type: String, require: false },
    ammonia: { type: String, require: false },
    nitrite: { type: String, require: false },
    transparency: { type: String, require: false },
    registerAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const DeskParameters = mongoose.model('DeskParameters', DeskParametersSchema);

module.exports = DeskParameters;
