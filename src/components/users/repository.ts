import { Types } from 'mongoose';
import { IUser, User } from './model';

export type IUserCreateObj = Omit<IUser, '_id' | 'fullName'>;

export interface IUserRepository {
  getAll: () => Promise<IUser[]>;
  getById: (id: string) => Promise<IUser | null>;
  createUser: (obj: IUserCreateObj) => Promise<IUser>;
}

class UserRepository implements IUserRepository {
  getAll = async () => User.find({}).lean();
  getById = async (id: string) => User.findById(id);
  createUser = async (userObj: IUserCreateObj) => {
    const user = new User({ ...userObj, _id: new Types.ObjectId() });
    return user.save();
  };
}

export const userRepository = new UserRepository();
