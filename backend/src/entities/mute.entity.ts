import { channel } from "diagnostics_channel";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";


@Entity({name: 'mute'})
export class Mute{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    endDate : Date;

    @ManyToOne(() => User)
    user : User;

    @ManyToOne(() => Channel, (channel) => channel.mute)
    channel : Channel;

}
