import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TableEnterprises1630349425853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enterprises",
                columns: [
                    {
                        name: "enterprise_id",
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
                        name: "occupation_area",
                        type: "varchar",
                    },
                    {
                        name: "founded_at",
                        type: "timestamp",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "director",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("enterprises");
    }

}
