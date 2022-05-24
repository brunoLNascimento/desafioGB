import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
  code: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date },
  cpf: { type: Number, max: 11 },
  statua: { type: String, default: 'Em validação' }
}, {
  collection: 'purcheses'
});

const SallerModel = mongoose.model('Purcheses', PurchaseSchema);

export default SallerModel;