import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  phone:     { type: String, required: true, trim: true, unique: true },
  email:     { type: String, trim: true, lowercase: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['customer', 'admin'], default: 'customer' },
  plan:      { type: String },
  planSpeed: { type: Number },
  planPrice: { type: Number },
  address:   { type: String },
  isActive:  { type: Boolean, default: false },
}, { timestamps: true });

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password helper
UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
