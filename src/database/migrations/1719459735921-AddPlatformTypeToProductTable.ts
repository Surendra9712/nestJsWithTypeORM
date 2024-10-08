import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPlatformTypeToProductTable1719459735921 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'platform_type',
                type: 'tinyint',
                unsigned: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'platform_type');
    }
}
