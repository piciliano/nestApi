import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import typeOrmConfigAsync from './database.config';
import { AllEntities } from 'utils/entities';

@Module({
    imports: [ TypeOrmModule.forFeature(AllEntities), TypeOrmModule.forRootAsync(typeOrmConfigAsync)],
})
export class DatabaseModule {}
