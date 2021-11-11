const mongoose = require('mongoose');

const ProbeParametersSchema = new mongoose.Schema(
  {
    systemId: { type: String, require: true },
    oxygen: { type: String, require: false },
    temperature: { type: String, require: false },
    conductivity: { type: String, require: false },
    salinity: { type: String, require: false },
    ph: { type: String, require: false },
    registerAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const ProbeParameters = mongoose.model(
  'ProbeParameters',
  ProbeParametersSchema
);

module.exports = ProbeParameters;
