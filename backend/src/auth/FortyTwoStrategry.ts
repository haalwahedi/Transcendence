import { Injectable } from "@nestjs/common";
import { Strategy} from 'passport-42';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){
        super({
            clientID: 'u-s4t2ud-b86d1e9dc90bcd715a76cc59c4f2d8021f0c19140484a99a113c7df6af3ea5f9', //env
            clientSecret: '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', //env
            callbackURL:'http://localhost:3001/api/auth/42/redirect', //env
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any){
        const {id, username} = profile;

        const user = await this.authService.validateUser({userName : username, id_42 : id}) 
        return user || null;
       
    }
}