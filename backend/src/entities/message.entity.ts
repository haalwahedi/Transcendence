import { channel } from "diagnostics_channel";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";


@Entity({name: 'messages'})
export class Message{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable : false})
    text : string;
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', update: false })
    createdAt : Date;

    @ManyToOne(() => User)
    sender : User;

    @ManyToOne(() => Channel, (channel) => channel.message)
    receiver : Channel;

}