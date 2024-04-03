const mongoose = require('mongoose');

const soldCarSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  previousOwner: String,
  purchaser: String,
  purchaseDate: Date,
  purchasePrice: Number,
}, { timestamps: true });

module.exports = mongoose.model("SoldCar", soldCarSchema);
