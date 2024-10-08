import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {editorColumns} from "../../snap-system/helpers/editor-migration";

export class CreateAssetTable1718010028008 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'assets',
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
                        name: 'url',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'thumbnail',
                        type: 'varchar',
                        length: '250',
                        isNullable:true
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '250',
                    },
                    {
                        name: 'productId',
                        type: 'integer',
                        unsigned: true,
                    },
                    ...editorColumns,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('assets');
    }
}
