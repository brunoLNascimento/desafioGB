const mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoincrement = require('mongoose-sequence')(mongoose);

const saller = new Schema({
  fullName: { type: String, required: true },
  cpf: { type: String, required: true, unique: true, max: 11  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
  saller_id: { type: Number }
},{
  collection: 'saller'
});

saller.plugin(autoincrement, {inc_field: 'saller_id'}).set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.id;
        delete ret.__v;

    },
});

mongoose.model('Saller', saller);