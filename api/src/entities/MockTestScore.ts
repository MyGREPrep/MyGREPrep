import{
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
}from "typeorm";
import {User} from "./User";

@Entity()
export class Mocktestscore extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "int"})
    score!: number;

    @Column()
    userId: number;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
