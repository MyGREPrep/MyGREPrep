import{
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
}from "typeorm";
import {User} from "./User";

@Entity()
export class MockTestScore extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "int"})
    score!: number;

    @Column()
    userId: number;

    @OneToOne(() => User, (user) => user.id)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
