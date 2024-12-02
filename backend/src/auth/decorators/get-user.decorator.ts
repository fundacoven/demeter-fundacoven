import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('GetUserDecorator');

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      logger.error('User not found in request');
      throw new InternalServerErrorException('User not found (request)');
    }

    logger.debug(`User retrieved: ${JSON.stringify(user)}`);
    return !data ? user : user[data];
  },
);
