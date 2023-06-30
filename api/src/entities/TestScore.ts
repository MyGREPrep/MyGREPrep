import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { MockTest } from "./MockTest";

export class TestScore extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score: number;

  @Column()
  mockTestId: number; // should foreign key be declared here

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id) // one user can take mulitple mock tests, but one mock test can have only 1 score
  user: User;

  @OneToOne(() => MockTest, (mockTest) => mockTest.id)
  mockTest: MockTest;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
