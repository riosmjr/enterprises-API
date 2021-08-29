import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertProfiles1630178649974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "profiles" (profile_id, title) 
                    VALUES
                    (1, 'Administrador'),
                    (2, 'Gestor'),
                    (3, 'Diretor'),
                    (4, 'Colaborador')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "profiles"`);
    }

}
