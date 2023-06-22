import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Option } from "./Option";

/* eslint-disable no-unused-vars */
export enum Section {
  QUANTITATIVE = "QUANTITATIVE",
  VERBAL = "VERBAL",
  ANALYTICAL = "ANALYTICAL",
}

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  question!: string;

  @Column({ type: "enum", enum: Section, default: Section.QUANTITATIVE })
  sectionType!: Section;

  @OneToMany(() => Option, (option) => option.questionId)
  options: Option[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
