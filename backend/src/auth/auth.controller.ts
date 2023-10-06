import { Controller, Get, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authGuard, jwtGuard } from './Guards';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User, UserStatus } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
     //http://localhost:3001/api/auth/login
     @UseGuards(authGuard)
     @Get('login')
     login(){
     }
 
     //http://localhost:3001/api/auth/42/redirect
     @UseGuards(authGuard)
     @Get('42/redirect')
     async redirect(@Req() req : Request, @Res({passthrough: true}) res : Response)
     {
        const jwt = (await this.authService.login(req.user));
         res.cookie('access_token', jwt, { httpOnly: true,
            maxAge: 60 * 60 * 1000,
         });
         const user = req.user as User;
         this.authService.updateUserStatus(user.id, { status : UserStatus.ONLINE});

         res.redirect("http://localhost:3000");
     }


     @Get('status')
     @HttpCode(200)
     @UseGuards(jwtGuard)
     status(){
     }

     @Get('logout')
     @UseGuards(jwtGuard)
     logout( @Res({passthrough: true}) res : Response, @Req() req : Request){
          const user = req.user as User;
          this.authService.updateUserStatus(user.id, {status: UserStatus.OFFLINE});
        res.cookie('access_token', '', {expires: new Date(Date.now())})
        .redirect("http://localhost:3000/login");
     }

}
