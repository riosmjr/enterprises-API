import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TableProfiles1630178549133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "profiles",
                columns: [
                    {
                        name: "profile_id",
                        type: "integer",
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("profiles");
    }

}
