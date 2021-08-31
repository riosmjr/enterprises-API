import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TableUsers1630178842563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "birth_at",
                        type: "timestamp",
                    },
                    {
                        name: "city_id",
                        type: "integer",
                    },
                    {
                        name: "schooling_id",
                        type: "integer",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true
                    },
                ],
            })
        );

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["city_id"],
            referencedColumnNames: ["city_id"],
            referencedTableName: "cities",
        }));

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["schooling_id"],
            referencedColumnNames: ["schooling_id"],
            referencedTableName: "schooling",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
