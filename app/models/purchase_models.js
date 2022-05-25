const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoincrement = require('mongoose-sequence')(mongoose);

const purcheses = new Schema({
  code: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date },
  cpf: { type: Number, max: 11 },
  statua: { type: String, default: 'Em validação' }
}, {
  collection: 'purcheses'
});

purcheses.plugin(autoincrement, {inc_field: 'purcheses_id'}).set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
    },
});

mongoose.model('Purcheses', purcheses);