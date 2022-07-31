import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpressRequestInterface } from 'src/common/types';

export const RefreshToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestInterface>();

    if (
      !request.body ||
      !request.body['refreshToken'] ||
      typeof request.body['refreshToken'] !== 'string'
    ) {
      throw new UnauthorizedException(
        'refreshToken must be a string and cannot be empty',
      );
    }

    if (data) {
      return request.body[data];
    }

    return request.body;
  },
);
