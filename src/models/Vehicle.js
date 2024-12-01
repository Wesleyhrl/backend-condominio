const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, required: true },
  owner: { type: Number, required: true }
},);

// Aplicando para gerar um ID sequencial único
vehicleSchema.plugin(AutoIncrement, { inc_field: 'vehicleId' });

module.exports = mongoose.model('Vehicle', vehicleSchema);



