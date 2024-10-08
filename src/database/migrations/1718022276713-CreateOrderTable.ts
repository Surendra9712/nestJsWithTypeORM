import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {editorColumns} from "../../snap-system/helpers/editor-migration";
import {OrderStatusEnum} from "../../common/enum/order-status.enum";

export class CreateOrderTable1718022276713 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
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
                        name: 'order_by',
                        type: 'integer',
                        unsigned: true,
                    },
                    {
                        name: 'status',
                        type: 'tinyint',
                        unsigned: true,
                        default:OrderStatusEnum.InCart
                    },
                    ...editorColumns,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
