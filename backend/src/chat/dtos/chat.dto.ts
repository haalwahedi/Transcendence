import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class sendMessageDto{
    @IsNotEmpty()
    @IsString()
    text : string;
    
    @IsNotEmpty()
    @IsNumber()
    channel_id : number;
}

export class CreateGroupDto{
    @IsNotEmpty()
    @IsString()
    name : string;
    
    @IsNotEmpty()
    @IsString()
    type : string;

    @IsOptional()
    members: User[];

    @IsString()
    pass : string;
}