import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDescriptionColumnToCategoryTable1719551225731 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'categories',
            new TableColumn({
                name: 'description',
                type: 'varchar',
                length:'500'
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('categories', 'description');
    }

}
