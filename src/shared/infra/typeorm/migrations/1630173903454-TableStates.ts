import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TableStates1630173903454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "states",
                columns: [
                    {
                        name: "state_id",
                        type: "integer",
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "uf",
                        type: "varchar",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("states");
    }

}
