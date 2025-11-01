import { Body, Controller, Get, Header, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/users.entity';
import { AppguardGuard } from 'src/appguard/appguard.guard';

@Controller('user')
@UseGuards(AppguardGuard)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private config: ConfigService
    ) { }

    @Get('test')
    test(): string {
        const db = this.config.get<string>('DB_HOST');
        return `Database is ${db}`;
    }

    @Get('data')
    getData(){
        return this.userService.findAll();
    }
    
    @Post('id')
    @HttpCode(200)
    @Header('Cache-Control', 'no-store')
    getUserById(@Body('id') id: number) {
        return this.userService.findById(id);
    }

    @Get(':id')
    getUserByIdParam(@Param('id') id: number) {
        return this.userService.findById(id);
    }

    @Post('name')
    @HttpCode(200)
    getUserEntity(@Body() body: Users) {
        return this.userService.findByName(body.name);
    }

}
