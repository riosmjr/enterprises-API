import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';

const bcrypt = require("bcrypt");
import {Exclude} from "class-transformer";

import Cities from "./Cities";
import Schooling from "./Schooling";
import Profiles from "./Profiles";

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    birth_at: Date;

    @Column({nullable: false, select: false})
    @Exclude()
    password: string;

    @Column({default: true})
    is_active: boolean;

    @CreateDateColumn({ default: () => "now()" })
    created_at: Date;

    @UpdateDateColumn({ default: () => "now()" })
    updated_at: Date;

    @DeleteDateColumn({nullable: true})
    deleted_at: Date;

    @Column({type: 'integer'})
    @JoinTable({database: 'cities'})
    @JoinColumn({name: 'city_id', referencedColumnName: 'city_id'})
    city_id: Cities;

    @Column({type: 'integer'})
    @JoinTable({database: 'schooling'})
    @JoinColumn({name: 'schooling_id', referencedColumnName: 'schooling_id'})
    schooling_id: Schooling;

    @Column({type: 'integer'})
    @JoinTable({database: 'profiles'})
    @JoinColumn({name: 'profile_id', referencedColumnName: 'profile_id'})
    profile_id: Profiles;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, 8);
        }
    }
}

export default Users;