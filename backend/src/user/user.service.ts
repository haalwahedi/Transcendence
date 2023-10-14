import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, updateUserDto } from './dtos/user.dto';
import { Match } from 'src/entities/match.entity';
import { Friendship } from 'src/entities/friend.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Match) private matchRepo: Repository<Match>,
         @InjectRepository(Friendship) private FriendshipRepo: Repository<Friendship>
    ){}

    async findAll() : Promise<User[]>{
        return await this.userRepo.find();
    }

    async getTopUsers(){
        return await this.userRepo.createQueryBuilder('user')
                        .where('user.rank IS NOT NULL')
                        .orderBy('user.rank', 'ASC')
                        .select(['user.userName', 'user.rank'])
                        .getMany();
    }

    async create(userDto: CreateUserDto) : Promise<User>
    {
        const user = this.userRepo.create({userName : userDto.userName, id_42 : userDto.id_42});
        return await this.userRepo.save(user);
    }

    async getuser(id : number) : Promise<User>
    {
        return await this.userRepo.findOne({where: {id : id}, relations: ['friends']}); //findoneorfail
    }

    async getmatch(id : number)
    {
        const match = await this.matchRepo.createQueryBuilder('match')
        .leftJoinAndSelect('match.winner', 'user')
        .leftJoinAndSelect('match.loser', 'loser')
        .where('user.id = :userId OR loser.id = :userId', { userId: id})
        .getMany()
        return match
    }

    async updateUser(id : number, userData : updateUserDto)
    {
        return await this.userRepo.update(id, userData);
    }

    async getfriends(id : number)
    {
        const user = await this.getuser(id);
        return user.friends;
    }

    async getfriendsReq(id : number)
    {
         const user = await this.getuser(id);
         const fri = await this.FriendshipRepo.find({where : {user2 : user}, relations: ['user1']});
        return [...fri]
    }
    
    async addFriend(id : number, friendId : number)
    {
        const user = await this.getuser(id);
        const friend = await this.getuser(friendId);
        user.friends.push(friend);
        return this.userRepo.save(user);

    }
    async removeFriend(id : number, friendId : number)
    {
        const user = await this.getuser(id);
        const friend = await this.getuser(friendId); //throw error if not found
        user.friends = user.friends.filter((friend) => friend.id !== friendId);
        return this.userRepo.save(user);

    }

    // async deleteuser(id : number)
    // {
    //     return await this.userRepo.delete(id);
    // }
 
    async getUserBy42id(id_42 : number) : Promise<User>
    {
        return await this.userRepo.findOneBy({id_42});
    }
    async getUserByname(userName : string) : Promise<User>
    {
        return await this.userRepo.findOneBy({userName});
    }
}
