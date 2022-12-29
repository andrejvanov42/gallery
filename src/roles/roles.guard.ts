import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import { ROLES_KEY } from './roles.decorator';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<any>(ROLES_KEY, [
      context.getHandler,
      context.getClass,
    ]);
    try {
      console.log('req roles', requiredRoles);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      console.log('req ', req);
      const authHeader = req.headers.authorization; //header of auth
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      // return;
      const request = context.switchToHttp().getRequest();
      const userId = request.userId;
      if (!userId) {
        throw new HttpException('user not authorized', HttpStatus.FORBIDDEN);
      }
      // get list of user roles
      const userRoles = await this.rolesService.getUserRole(userId);
      // return true if one of user roles is included in required roles
      for (const userRole of userRoles) {
        if (requiredRoles.includes(userRole.roleName)) return true;
      }
    } catch (e) {
      throw new HttpException('Нет доступаа', HttpStatus.FORBIDDEN);
    }
  }
}
