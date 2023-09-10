import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AllEntities } from 'utils/entities';

export default <TypeOrmModuleAsyncOptions>{
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService:ConfigService): Promise<TypeOrmModuleOptions> => {
        return <PostgresConnectionOptions>{
            type:'postgres',
            host:configService.get("DB_HOST"),
            port:+configService.get("DB_PORT"),
            username:configService.get("DB_USERNAME"),
            password:configService.get("DB_PASSWORD"),
            database:configService.get("DB_NAME"),
            entities: AllEntities,
            synchronize:true,
        };
    },
};