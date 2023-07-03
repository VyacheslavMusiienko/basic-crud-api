import { IncomingMessage, ServerResponse } from 'http';
import { HTTPCodes, IUserController, IUserService } from './type';
import { getBody, getId, sendResponse } from './utils';

export function createUserController(userService: IUserService): IUserController {
  async function getAll(_: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const users = await userService.getAll();
    sendResponse(res, users);
  }

  async function getOne(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req.url);
    const user = await userService.getOne(id);
    sendResponse(res, user);
  }

  async function create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const body = await getBody(req);
    const newUser = await userService.create(body);
    sendResponse(res, newUser, HTTPCodes.CREATED);
  }

  async function deleteUser(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req.url);
    const deleted = await userService.delete(id);
    sendResponse(res, deleted, HTTPCodes.NO_CONTENT);
  }

  async function update(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const id = getId(req.url);
    const body = await getBody(req);
    const updatedUser = await userService.update(id, body);
    sendResponse(res, updatedUser);
  }

  return {
    getAll,
    getOne,
    create,
    delete: deleteUser,
    update,
  };
}