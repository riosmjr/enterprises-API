import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TableEnterpriseUser1630368669020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enterpriseuser",
                columns: [
                    {
                        name: "enterpriseuser_id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "enterprise_id",
                        type: "uuid",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
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
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true
                    },
                ],
            })
        );

        await queryRunner.createForeignKey("enterpriseuser", new TableForeignKey({
            columnNames: ["enterprise_id"],
            referencedColumnNames: ["enterprise_id"],
            referencedTableName: "enterprises",
        }));

        await queryRunner.createForeignKey("enterpriseuser", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "users",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("enterprise_user");
    }

}
