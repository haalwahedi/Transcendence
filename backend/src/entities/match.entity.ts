import { channel } from "diagnostics_channel";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";


@Entity({name: 'match'})
export class Match{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable : false})
    score : string;
    
    @CreateDateColumn()
    createdAt : Date;

    @ManyToOne(() => User)
    winner : User;

    @ManyToOne(() => User)
    loser : User;



}