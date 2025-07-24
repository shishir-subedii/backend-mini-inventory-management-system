import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;
}
