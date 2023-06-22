import {
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Question } from "./Question";

/* eslint-disable no-unused-vars */
export enum Section {
  QUANTITATIVE = "quantitative",
  VERBAL = "verbal",
  ANALYTICAL = "analytical",
}

export class SectionType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: Section, default: Section.QUANTITATIVE })
  type!: Section;

  @Column()
  questionId: number;

  @OneToOne(() => Question, (question) => question.sectionType)
  question: Question;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
