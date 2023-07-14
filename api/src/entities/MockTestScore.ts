import{
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
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

    @ManyToOne(() => User, (user) => user.mockTestScores)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
