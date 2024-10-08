import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {editorColumns} from "../../snap-system/helpers/editor-migration";

export class CreateProductOrderTable1719997406683 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product_orders',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'integer',
                        unsigned: true
                    },
                    {
                        name: 'order_id',
                        type: 'integer',
                        unsigned: true
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        unsigned: true,
                    },
                    {
                        name: 'total_price',
                        type: 'decimal',
                        precision:10,
                        scale:2
                    },
                    ...editorColumns,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_orders');
    }
}
