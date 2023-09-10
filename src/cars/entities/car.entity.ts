import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    Marca: string;

    @Column()
    Modelo: string;

    @Column()
    Ano: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;
    owner: any;

    @ManyToOne(() => User, (user) => user.cars)
    @JoinColumn({ name: 'user_id' })
    userId: User;
}
