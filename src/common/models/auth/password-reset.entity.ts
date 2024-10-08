import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("password_resets")
export class PasswordResetEntity{
    @PrimaryGeneratedColumn()
    public id:number;

    @Column({name:'email',type:'varchar',length:50})
    public email: string;

    @Column({name:'token',type:'varchar',length:250})
    public token: string;

    @CreateDateColumn({ name: 'created_at',type:'datetime',default:'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @BeforeInsert()
    onCreateInsertEditorDates() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    onUpdateEditorDates() {
        this.createdAt = new Date();
    }
}