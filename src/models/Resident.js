const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  apartment: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

// Adiciona o auto-incremento no campo `id`
residentSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Resident', residentSchema);
