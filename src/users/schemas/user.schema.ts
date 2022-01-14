import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
  },
  { timestamps: true },
);

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;

  return userObject;
};

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});
