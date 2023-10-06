import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { Mute } from "./mute.entity";
import { Ban } from "./ban.entity";
import { Message } from "./message.entity";

export enum ChannelType{
    PUBLIC = 'public',
    PRIVATE = 'private',
    PROTECTED = 'protected',
    DIRECT = 'direct'
}

@Entity({name: 'channel'})
export class Channel 
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name : string;

    @Column({ type: "enum", enum: ChannelType})
    type : ChannelType;

    @Column({nullable: true})
    password : string;


    @ManyToOne(() => User)
    owner : User;

    @ManyToMany(() => User)
    @JoinTable()
    members : User[];

    @ManyToMany(() => User)
    @JoinTable()
    admins : User[];

    @OneToMany(() => Mute, (mute) => mute.channel)
    mute : Mute[];

    @OneToMany(() => Ban, (ban) => ban.channel)
    ban : Ban[];

    @OneToMany(() => Message, (message) => message.receiver)
    message : Message[];

    // @BeforeInsert( )
    // async hashPassoword(){
    //    this.password = await bcrypt.hash(this.password,10);//npm i bcrypt
    // }

}