import { Response } from 'express';

export const handleError = (
  res: Response,
  error: any,
  msg: string = 'Internal server error',
  statusCode: number = 500
) => {
  res.status(statusCode).json({
    ok: false,
    msg,
    error: {
      name: error.name || 'UnknownError',
      message: error.message || 'No message provided',
      stack: error.stack || null,
      driverError: error.driverError || null
    }
  });
};
