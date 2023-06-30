import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// Not using any Section Type table, hence, using enum
/* eslint-disable no-unused-vars */
export enum Section {
  QUANTITATIVE = "quantitative",
  VERBAL = "verbal",
  ANALYTICAL = "analytical",
}

export class MockTest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  testDesc!: string;

  @Column({ type: "enum", enum: Section, default: Section.QUANTITATIVE })
  type!: Section;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
