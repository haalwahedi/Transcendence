import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from 'passport-jwt';
import { AuthService } from "./auth.service";
import { Request } from "express";
import { promises } from "dns";
import { User } from "src/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                  return request.cookies['access_token']; // Extract from 'access_token' cookie
                },
              ]),
            ignoreExpiration: false,
            secretOrKey: 'dswfef' //env
        })
    }

    async validate(payload : any): Promise<User>{
        const user = await this.authService.getUser(payload.id);
        if (!user) throw new UnauthorizedException('Please log in to continue');
        return {...user};
    }
}