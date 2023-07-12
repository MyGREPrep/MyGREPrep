import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/* eslint-disable no-unused-vars */
export enum Significance {
    HIGH = "HIGH",
    MEDUIM = "MEDUIM",
    LOW = "LOW",
}

/* eslint-disable no-unused-vars */
export enum TopicType {
    ratio = "ratio",
    percentage = "percentage",
    arithmetic = "arithmetic"
    // need to add more
}

@Entity()
export class Topic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "enum", enum: TopicType, default: TopicType.ratio})
    type!: TopicType;

    @Column()
    description!: string;

    @Column({ type: "enum", enum: Significance, default: Significance.LOW })
    significance!: Significance;

    @Column()
    videoUrl!: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}