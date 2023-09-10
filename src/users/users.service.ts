import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    const newUser = this.userRepository.create(createUserDto);

    try {
      if (existingUser) {
        throw new ConflictException('email already exists');
      }
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findAll(email?: string) {
    return email
      ? await this.userRepository.find({ where: { email: Like(`%${email}%`) } })
      : await this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const userFound = await this.userRepository.findOne({ where: { id }, relations: { cars: true } })

      if (!userFound) {
        throw new NotFoundException('Id not found')
      }
      return userFound;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: {
          password: true,
          id: true,
          email: true,
        },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    if (updateUserDto.email) {
      existingUser.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      existingUser.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    if (updateUserDto.isActive !== undefined) {
      existingUser.isActive = updateUserDto.isActive;
    }
    const updatedUser = await this.userRepository.save(existingUser);
    return updatedUser;
  }

  async remove(id: number) {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    existingUser.isActive = false;
    await this.userRepository.save(existingUser);
    return {
      email: existingUser.email,
      message: 'Usuário marcado como excluído com sucesso',
    };

  }

}
