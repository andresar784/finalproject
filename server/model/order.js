const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    medicine: { type: String },
    indication: { type: String}
}); 

module.exports = mongoose.model('Order', orderSchema);