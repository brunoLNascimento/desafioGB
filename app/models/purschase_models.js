const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoincrement = require('mongoose-sequence')(mongoose);

const purschase = new Schema({
  saller_id: { type: String, required: true },
  code: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: String },
  cpf: { type: String, max: 11 },
  status: { type: String },
  cashBack: {type: Number }

}, {
  collection: 'purschase'
});

purschase.plugin(autoincrement, {inc_field: 'purschase_id'}).set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.id;
        delete ret.__v;
    },
});

mongoose.model('Purschase', purschase);