import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FortyTwoStrategy } from './FortyTwoStrategry';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [PassportModule, UserModule, JwtModule.register({
        secret: 'dswfef', //env
        // signOptions: { expiresIn: 1000},

    })],
    controllers: [AuthController],
    providers: [AuthService, FortyTwoStrategy, JwtStrategy],
    exports: [AuthService] 
})
export class AuthModule {}
