import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

import User from "../../../../users/infra/typeorm/entities/Users";
import Enterprise from "./Enterprises";
import Profile from "../../../../users/infra/typeorm/entities/Profiles";

@Entity('enterpriseuser')
class EnterpriseUser {
    @PrimaryGeneratedColumn('uuid')
    enterpriseuser_id: string;

    @Column({type: 'uuid'})
    @JoinTable({database: 'users'})
    @JoinColumn({name: 'user_id', referencedColumnName: 'user_id'})
    user_id: User;

    @Column({type: 'uuid'})
    @JoinTable({database: 'enterprises'})
    @JoinColumn({name: 'enterprise_id', referencedColumnName: 'enterprise_id'})
    enterprise_id: Enterprise;

    @Column({type: 'uuid'})
    @JoinTable({database: 'profiles'})
    @JoinColumn({name: 'profile_id', referencedColumnName: 'profile_id'})
    profile_id: Profile;

    @Column({default: true})
    is_active: boolean;

    @CreateDateColumn({ default: () => "now()" })
    created_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;
}

export default EnterpriseUser;