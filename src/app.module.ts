import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/dataBase.module';
import { AuthModule } from './auth/auth.module';
import { CarsModule } from './cars/cars.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true}),
        UsersModule, DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        CarsModule],
})
export class AppModule { }