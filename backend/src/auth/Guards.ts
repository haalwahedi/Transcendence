import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class authGuard extends AuthGuard('42'){}

@Injectable()
export class jwtGuard extends AuthGuard('jwt'){}
