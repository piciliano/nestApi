import { IsEmpty, IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateCarDto {
    @IsNotEmpty()
    Marca: string;

    @IsNotEmpty()
    Modelo: string;

    @IsNotEmpty()
    Ano: number;

    @IsEmpty()
    userId: number

}
