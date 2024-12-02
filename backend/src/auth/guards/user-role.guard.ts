import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('UserRoleGuard activated');

    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    console.log('Valid roles for this route:', validRoles);

    if (!validRoles || validRoles.length === 0) {
      console.log('No roles required for this route, allowing access.');
      return true; // Si no hay roles requeridos, el acceso está permitido
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log('User roles from request:', user.roles);

    if (!user) {
      console.log('User not found in the request');
      throw new BadRequestException('User not found');
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    const userHasValidRole = user.roles.some((role) =>
      validRoles.includes(role),
    );

    if (userHasValidRole) {
      console.log('User has a valid role, access allowed');
      return true;
    }

    console.log(
      `User ${user.firstName} ${user.lastName} does not have a valid role, access denied`,
    );
    throw new ForbiddenException(
      `User ${user.firstName} ${user.lastName} needs a valid role: [${validRoles}]`,
    );
  }
}
