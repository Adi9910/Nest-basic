import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/configuration";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "./user-module/user-module";
import { LoggerMiddleware } from "./logger/logger.middleware";


@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env'
        }),

        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (cf: ConfigService) => ({
                type: 'postgres',
                host: cf.get<string>('host'),
                port: cf.get<number>('port'),
                username: cf.get<string>('username'),
                password: cf.get<string>('password'),
                database: cf.get<string>('name'),
                autoLoadEntities: true,
                synchronize: false,
            })
        }),

        UserModule
    ],
})
export class AppModule implements NestModule { 
    configure(userMid: MiddlewareConsumer) {
        userMid.apply(LoggerMiddleware).forRoutes('user')
    }
}