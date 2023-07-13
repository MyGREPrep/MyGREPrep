import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MockTestScore } from "./MockTestScore";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  photoUrl!: string;

  @Column({ type: "int", nullable: true })
  phoneNumber: number | null;

  @OneToMany(() => MockTestScore, (mockTestScore) => mockTestScore.score)
  mockTestScores: MockTestScore[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
