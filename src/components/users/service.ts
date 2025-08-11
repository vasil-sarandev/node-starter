import { IUserCreateObj, IUserRepository, userRepository } from './repository';
import { AppError } from '@/middlewares/error';

class UsersService {
  private repository: IUserRepository;
  constructor(repository?: IUserRepository) {
    this.repository = repository ?? userRepository;
  }

  getAll = async () => {
    const users = await this.repository.getAll();
    return users;
  };

  getById = async (id: string) => {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new AppError(404, 'User does not exist');
    }
    return user;
  };

  createUser = async (userObj: IUserCreateObj) => {
    const user = await this.repository.createUser(userObj);
    return user;
  };
}

export const usersService = new UsersService();
