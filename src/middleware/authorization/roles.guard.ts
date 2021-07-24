import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolePermission } from 'src/lib/constant/role.constant'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const path = req.route.path
    const method = req.method
    const user = req.user

    const permission = RolePermission[user.role].findIndex(e => e.path === path && e.method === method)

    console.log({ path, method, user, permission })

    if (permission === -1) {
      throw new UnauthorizedException('not allowed to access this route')
    }

    return true
  }
}