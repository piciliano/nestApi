import { IsEmail, IsString, IsBoolean, IsNotEmpty, Length, IsEmpty } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    @Length(5, 50)
    @IsNotEmpty({message:'email não pode estar vazio!'})
    email: string;

    @IsString()
    @Length(4, 10)
    @IsNotEmpty({message:'insira a senha!'})
    password: string;

    @IsBoolean()
    @IsNotEmpty({message:`'defina true ou false! 'isActive'`})
    isActive: boolean;
}
