const mongoose = require('mongoose');

const SystemSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    name: { type: String, require: false },
    specie: { type: String, require: false },
    systemType: { type: String, require: false },
    lifeStage: { type: String, require: false },
  },
  { versionKey: false }
);

const System = mongoose.model('System', SystemSchema);

module.exports = System;
