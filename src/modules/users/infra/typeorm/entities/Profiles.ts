import {
    Entity,
    Column,
    PrimaryColumn,
} from 'typeorm';

@Entity('profiles')
class Profiles {
    @PrimaryColumn({nullable: false, type: "integer"})
    profile_id: "integer";

    @Column({nullable: false})
    title: string;
}

export default Profiles;