import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'forms' })
export class Form extends BaseEntity{
    @Column({ type: 'varchar', length: 300, default:"" })
    name: string;
    
    @Column({ type: 'jsonb', nullable: true })
    body: Record<string, any>[]; 
}