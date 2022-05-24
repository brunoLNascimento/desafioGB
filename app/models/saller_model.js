import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SallerSchema = new Schema({
  fullName: { type: String, required: true },
  cpf: { type: Number, max: 11 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
}, {
  collection: 'sallers'
});

const SallerModel = mongoose.model('Saller', SallerSchema);

export default SallerModel;