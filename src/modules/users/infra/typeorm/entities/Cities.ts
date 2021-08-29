import {
    Entity,
    Column,
    PrimaryColumn,
    JoinTable,
    JoinColumn
} from 'typeorm';

import States from "./States";

@Entity('cities')
class Cities {
    @PrimaryColumn({nullable: false, type: "integer"})
    city_id: "integer";

    @Column({nullable: false})
    name: string;

    @Column({type: 'integer'})
    @JoinTable({database: 'states'})
    @JoinColumn({name: 'state_id', referencedColumnName: 'state_id'})
    state_id: States;
}

export default Cities;