import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  plan:           { type: String, required: true },
  speed:          { type: Number },
  price:          { type: Number },
  connectionType: { type: String, default: 'New connection' },
  fullName:       { type: String, required: true, trim: true },
  phone:          { type: String, required: true, trim: true },
  email:          { type: String, trim: true, lowercase: true },
  address:        { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'active', 'cancelled'],
    default: 'pending',
  },
  notes: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
