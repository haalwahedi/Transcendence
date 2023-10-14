import { generateString } from "@nestjs/typeorm";
import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable, AfterInsert } from "typeorm";

export enum UserStatus{
    ONLINE = 'online',
    OFFLINE = 'offline',
    PLAYING = 'playing'
}
//structre of our user table
@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true, nullable: false})
    id_42 : number;

    @Column({ unique: true, nullable: false})
    userName : string;

    @Column({default: "https://cdn.dribbble.com/users/134903/screenshots/7038101/media/8515afd18d80839a4bf7660a9957657c.png?resize=400x0"})
    avatar : string;

    @Column({default: false})
    twoFactor: boolean;

    @Column({ type: "enum", enum: UserStatus, default: UserStatus.ONLINE})
    status : UserStatus;

    @Column({default : null})
    rank : number;

    @ManyToMany(() => User)
    @JoinTable()
    friends : User[];

    @ManyToMany(() => User)
    @JoinTable()
    blocked : User[];


    
    //hash password
    //@BeforeInsert( )
    //async hashPassoword(){
    //    this.password = await bcrybt.hash(this.passoword,10);//npm i bcrybt
    //}
}