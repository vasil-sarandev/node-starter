import { model, Schema } from 'mongoose';

interface IUserBase {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IUserVirtuals {
  fullName: string;
}

export type IUser = IUserBase & IUserVirtuals;

const userSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return value.length > 3;
      },
      message: 'firstName must be more than 3 characters.',
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return value.length > 3;
      },
      message: 'lastName must be more than 3 characters.',
    },
  },
});

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model('User', userSchema);
