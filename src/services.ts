import { validate } from "uuid";
import { IUserRepository, IUserService } from './type';
import { isUser } from './utils';
import { BadRequestError } from './apiError';

export function createUserService(userRepository: IUserRepository): IUserService {
  return {
    async getAll() {
      return userRepository.getAll();
    },

    async getOne(id: string) {
      if (!validate(id)) {
        throw new BadRequestError('Invalid user id');
      }
      return userRepository.getOne(id);
    },

    async create(user: unknown) {
      if (!isUser(user)) {
        throw new BadRequestError('Invalid user data');
      }
      return userRepository.create(user);
    },

    async delete(id: string) {
      if (!validate(id)) {
        throw new BadRequestError('Invalid user id');
      }
      return userRepository.delete(id);
    },

    async update(id: string, user: unknown) {
      if (!validate(id)) {
        throw new BadRequestError('Invalid user id');
      }
      if (!isUser(user)) {
        throw new BadRequestError('Invalid user data');
      }
      return userRepository.update(id, user);
    }
  };
}