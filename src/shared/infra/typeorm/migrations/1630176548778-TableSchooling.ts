import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TableSchooling1630176548778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "schooling",
                columns: [
                    {
                        name: "schooling_id",
                        type: "integer",
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schooling");
    }

}
