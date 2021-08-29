import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertSchooling1630176563589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "schooling" (schooling_id, title) 
                    VALUES
                    (1, 'Infantil'),
                    (2, 'Fundamental'),
                    (3, 'Médio'),
                    (4, 'Superior'),
                    (5, 'Pós-graduação'),
                    (6, 'Mestrado'),
                    (7, 'Doutorado')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "schooling"`);
    }

}
