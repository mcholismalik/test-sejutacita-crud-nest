import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const { url, method } = context.switchToHttp().getRequest();
    console.log("here req.url & req.method")
    console.log({ url, method })


    const { user } = context.switchToHttp().getRequest();
    console.log("here req.user")
    console.log(user)
    return true
  }
}