import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserItf } from '../user-itf/user-itf.interface';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>
    ) { }


    create(userData: Partial<Users>) {
        const user = this.userRepo.create(userData);
        return this.userRepo.save(user);
    }

    findAll(): Promise<UserItf[]> {
        const users = this.userRepo.find();
        return users;
    }

    findById(id: number) {
        return this.userRepo.findOneBy({ id: id });
    }

    findByName(name: string) {
        return this.userRepo.findOneBy({ name: name });
    }
}
