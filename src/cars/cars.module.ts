import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { DataSource } from 'typeorm';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [ TypeOrmModule.forFeature([Car]), UsersModule],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],

})
export class CarsModule {
  constructor(private dataSource: DataSource) {}

}
