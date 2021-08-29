import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TableCities1630173931169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cities",
                columns: [
                    {
                        name: "city_id",
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
                        name: "state_id",
                        type: "integer",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey("cities", new TableForeignKey({
            columnNames: ["state_id"],
            referencedColumnNames: ["state_id"],
            referencedTableName: "states",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cities");
    }

}