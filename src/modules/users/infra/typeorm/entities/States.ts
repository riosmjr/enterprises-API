import {
    Entity,
    Column,
    PrimaryColumn
} from 'typeorm';

@Entity('states')
class States {
    @PrimaryColumn({nullable: false, type: "integer"})
    state_id: "integer";

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    uf: string;
}

export default States;