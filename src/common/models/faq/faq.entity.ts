import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../snap-system/base-entity/base-entity";

@Entity({name: 'faqs'})
export class FaqEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number

    @Column({name: 'question', type: 'varchar', length: 255})
    public question: string;

    @Column({name: 'answer', type: 'text'})
    public answer: string;
}