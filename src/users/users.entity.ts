import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'userDetail'})
export class Users {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;
}
