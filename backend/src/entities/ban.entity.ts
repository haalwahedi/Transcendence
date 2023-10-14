import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";


@Entity({name: 'ban'})
export class Ban{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    endDate : Date;

    @ManyToOne(() => User)
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.ban)
    channel : Channel;

}