import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError, NotFoundError } from './apiError';
import { API_URL, API_URL_WITH_ID } from './constants';
import { createUserController } from './controller';
import { createUserRepository } from './repository';
import { createUserService } from './services';
import { HTTPCodes, User } from './type';
import { sendResponse } from './utils';

export const router = (processPort: number) => {
  const users: User[] = [];
  const userRepository = createUserRepository(users);
  const userService = createUserService(userRepository);
  const userController = createUserController(userService);

  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "application/json");

    try {
      const { url, method } = req;
      console.log(
        `Executing request: ${method} ${url} --- Server #${process.pid} on port ${processPort}`
      );

      if (!url.match(API_URL) && !url.match(API_URL_WITH_ID)) {
        throw new NotFoundError(`Cannot ${method} ${url}`);
      }

      switch (method) {
        case "GET":
          if (url.match(API_URL_WITH_ID)) {
            await userController.getOne(req, res);
          } else {
            await userController.getAll(req, res);
          }
          break;

        case "POST":
          if (!url.match(API_URL)) {
            throw new NotFoundError(`Cannot ${method} ${url}`);
          }
          await userController.create(req, res);
          break;

        case "PUT":
          await userController.update(req, res);
          break;

        case "DELETE":
          await userController.delete(req, res);
          break;

        default:
          throw new BadRequestError('Method is not supported');
      }
    } catch (error) {
      const { code, message } = error;
      let statusCode = HTTPCodes.INTERNAL_SERVER_ERROR;

      if (error instanceof BadRequestError) {
        statusCode = HTTPCodes.BAD_REQUEST;
      } else if (error instanceof NotFoundError) {
        statusCode = HTTPCodes.NOT_FOUND;
      }

      sendResponse(res, { message }, statusCode);
    }
  };
};