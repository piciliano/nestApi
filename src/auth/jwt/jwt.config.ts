import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

export const jwtConfigOptions: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory:(ConfigService: ConfigService) => ({
        secret:ConfigService.get('JWT_SECRET'),
        signOptions: {
           expiresIn: ConfigService.get('JWT_EXPIRATION')
        },
    }),
};