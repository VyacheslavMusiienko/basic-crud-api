export class BadRequestError extends Error {
  public code: number;

  constructor(public message: string) {
    super();
    this.name = 'BadRequestError';
    this.code = 400;
  }
}

export class NotFoundError extends Error {
  public code: number;

  constructor(public message: string) {
    super();
    this.name = 'NotFoundError';
    this.code = 404;
  }
}

export class InternalError extends Error {
  public code: number;

  constructor(public message: string) {
    super();
    this.name = 'InternalError';
    this.code = 500;
  }
}
