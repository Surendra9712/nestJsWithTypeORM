import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {editorColumns} from "../../snap-system/helpers/editor-migration";

export class CreateProductTable1718001837361 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
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
                        name: 'title',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                        length: '50',
                    },
                    {
                        name: 'tags',
                        type: 'varchar',
                    },
                    {
                        name: 'category_id',
                        type: 'integer',
                        unsigned: true,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision:10,
                        scale:2
                    },
                    {
                        name:'description',
                        type: 'text',
                    },
                    {
                        name:'thumbnail_url',
                        type: 'varchar',
                        length: '255',
                    },
                    ...editorColumns,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }
}
