import {
    Entity,
    Column,
    PrimaryColumn,
} from 'typeorm';

@Entity('schooling')
class Schooling {
    @PrimaryColumn({nullable: false, type: "integer"})
    schooling_id: "integer";

    @Column({nullable: false})
    title: string;
}

export default Schooling;