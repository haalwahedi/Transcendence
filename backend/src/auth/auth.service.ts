import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, updateUserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService : UserService,
                private jwtService : JwtService){}
    
    async validateUser(userDetails : CreateUserDto)
    {
        // let user : User;
        const user = await this.userService.getUserBy42id(userDetails.id_42);
        if (!user)
           return await this.userService.create(userDetails);
        return user;
    }

    async login(user: any)
    {
        const payload = {name: user.userName, id : user.id};

        return await this.jwtService.signAsync(payload);
    }
    async getUser(id : number)
    {
        return this.userService.getuser(id);
    }

    async updateUserStatus(id : number, userStatus : updateUserDto)
    {
      this.userService.updateUser(id,  userStatus)
    }
    async getPayload(token : string){
        try {
            const payload = await this.jwtService.verifyAsync(
              token,
              {
                secret: 'dswfef'
              }
            );
           return payload.id;
          } catch {
            throw new UnauthorizedException();
          }
    }
}
