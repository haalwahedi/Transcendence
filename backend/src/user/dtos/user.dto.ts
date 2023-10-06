import { IsBoolean, isBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {UserStatus }from "../../entities/user.entity"

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    userName : string;
    
    @IsNotEmpty()
    @IsNumber()
    id_42 : number;
}

export class updateUserDto{
  
    @IsOptional()
    @IsString()
    userName ?: string;

    @IsOptional()
    @IsString()
    avatar ?: string;

    @IsOptional()
    @IsBoolean()
    twoFactor?: boolean;

    @IsOptional()
    status ?: UserStatus;

    @IsOptional()
    @IsEnum(UserStatus)
    rank ?: number;
}