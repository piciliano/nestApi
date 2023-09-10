import { InternalServerErrorException } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, OneToMany, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { Car } from 'src/cars/entities/car.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ unique: true})
    email: string;
  
    @Column({select:false})
    password: string;

    @Column({ name: 'is_active', default:true})
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @BeforeInsert()
    async passwordHash() {
        try {
            if (this.password) {
                this.password = await bcrypt.hash(this.password, 10);
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error on hash.');
        }
    }

    @OneToMany(() => Car, car => car.userId)
    @JoinColumn()
    cars: Car[];
}
