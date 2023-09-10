import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private JwtService: JwtService,
    private usersService: UsersService,
  ) { }

  async signIn(createAuthDto: AuthDto) {
    try {
      const {email, password} = createAuthDto;
      const userFound = await this.usersService.findByEmail(email)
      if(!userFound) {
        throw new UnauthorizedException('Email or password invalid.')
      }
      const passwordMatch = await bcrypt.compare(password, userFound.password)
      if (!passwordMatch) {
        throw new UnauthorizedException('Email or password invalid');
      }
      const payload = { sub: userFound.id, email: userFound.email};
      return {
        email,
        token: await this.JwtService.signAsync(payload),
        message:'Login successfully'
      }
    } catch (error) {
      console.log(error)

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
