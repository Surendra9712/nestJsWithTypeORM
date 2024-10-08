import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {editorColumns} from "../../snap-system/helpers/editor-migration";

export class CreateAccessTokenTable1718604437047 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'access_tokens',
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
                        name: 'token_id',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'user_id',
                        type: 'integer',
                        unsigned:true
                    },
                    {
                        name: 'revoked',
                        type: 'boolean',
                        default: false,
                    }, {
                        name: 'expires_at',
                        type: 'datetime',
                    },
                    ...editorColumns,
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access_tokens');
    }

}
