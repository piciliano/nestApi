import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigOptions } from './jwt/jwt.config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[JwtModule.registerAsync({ ...jwtConfigOptions, global: true}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
