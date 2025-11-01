import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Users } from 'src/users/users.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
