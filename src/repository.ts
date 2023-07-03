import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from './apiError';
import { IUserRepository, User } from './type';

export function createUserRepository(users: User[]): IUserRepository {
  return {
    getAll: async () => users,

    getOne: async (id: string) => {
      const user = users.find((user) => user.id === id);
      if (user) {
        return user;
      }

      throw new NotFoundError(`User with id ${id} not found`);
    },

    create: async (user: User) => {
      const newUser = { ...user, id: uuidv4() };
      users.push(newUser);
      return newUser;
    },

    delete: async (id: string) => {
      const candidate = users.find((user) => user.id === id);
      if (candidate) {
        users.splice(users.indexOf(candidate), 1);
        return "deleted";
      }

      throw new NotFoundError(`User with id ${id} not found`);
    },

    update: async (id: string, user: User) => {
      const candidate = users.find((user) => user.id === id);
      if (!candidate) {
        throw new NotFoundError(`User with id ${id} not found`);
      }

      const updatedUser = { ...user, id };
      users.splice(users.indexOf(candidate), 1, updatedUser);
      return updatedUser;
    }
  };
}