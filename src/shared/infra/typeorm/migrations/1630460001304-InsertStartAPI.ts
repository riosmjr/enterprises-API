import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertStartAPI1630460001304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "users" (user_id, name, email, birth_at, city_id, schooling_id, password) 
                  values ('88aa017a-bf2e-4ebd-ad7b-566e80ad0b73', 'User Teste', 'teste@gmail.com', '2000-08-31', 2155, 4, '$2b$08$kV3l3lUBX4uHa5jBAlzRnOolWw2dHZ3o7qp1e4o4sP1QGMS.lLcyO')`,
        );

        await queryRunner.query(
            `INSERT INTO "enterprises" (enterprise_id, name, occupation_area, founded_at, description, director) 
                  values ('08e6ea0d-66f6-4f95-b700-399b05bddb66', 'Empreendimento Teste', 'Área de ocupação teste', '2020-08-31', 'Descrição teste', 'Director teste')`,
        );

        await queryRunner.query(
            `INSERT INTO "enterpriseuser" (enterprise_id, user_id, profile_id) 
                  values ('08e6ea0d-66f6-4f95-b700-399b05bddb66', '88aa017a-bf2e-4ebd-ad7b-566e80ad0b73', 1)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "users"`);
        await queryRunner.query(`DELETE FROM "enterprises"`);
        await queryRunner.query(`DELETE FROM "enterpriseuser"`);
    }

}
