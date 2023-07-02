import { IncomingMessage, ServerResponse } from 'http';
import { BadRequestError } from './apiError';
import { HTTPCodes, User } from './type';

export const isUser = (obj: Partial<User>): obj is User => {
  return (
    typeof obj.username === "string" &&
    typeof obj.age === "number" &&
    Array.isArray(obj.hobbies) &&
    obj.hobbies.every((h) => typeof h === "string")
  );
};

export const getId = (url: string) => {
  const groups = url.match(/\/api\/users\/([\w-]+)/);
  return groups ? groups[1] : null;
};

export const getBody = async (request: IncomingMessage): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const buff: Uint8Array[] = [];
    request
      .on("data", (chunk: Uint8Array) => {
        buff.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.concat(buff).toString().trim();
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          reject(new BadRequestError('Invalid user data'));
        }
      })
      .on("error", () => {
        reject();
      });
  });
};

export function sendResponse<T>(
  res: ServerResponse<IncomingMessage>,
  data: T,
  status: HTTPCodes = HTTPCodes.OK
) {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}