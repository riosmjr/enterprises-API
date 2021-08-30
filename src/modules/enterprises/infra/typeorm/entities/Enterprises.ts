import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

@Entity('enterprises')
class Enterprises {
    @PrimaryGeneratedColumn('uuid')
    enterprise_id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    occupation_area: string;

    @Column({nullable: false})
    description: string;

    @Column({nullable: false})
    director: string;

    @Column({nullable: false})
    founded_at: Date;

    @Column({default: true})
    is_active: boolean;

    @CreateDateColumn({ default: () => "now()" })
    created_at: Date;

    @UpdateDateColumn({ default: () => "now()" })
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;
}

export default Enterprises;