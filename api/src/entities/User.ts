import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Mocktestscore } from "./MockTestScore";

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

  @Column({ type: "bigint", nullable: true })
  phoneNumber: number | null;

  @Column({ type: "int", default: 200 })
  rewards!: number;

  @OneToMany(() => Mocktestscore, (mockTestScore) => mockTestScore.userId)
  mockTestScores: Mocktestscore[];

  @Column({ default: false })
  isPremium: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
