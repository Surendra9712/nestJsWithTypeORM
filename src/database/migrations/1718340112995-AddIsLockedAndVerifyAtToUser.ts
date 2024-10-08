import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddIsLockedAndVerifyAtToUser1718340112995 implements MigrationInterface {
    name = 'AddIsLockedAndVerifyAtToUser1718340112995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'users', [
                new TableColumn({
                    name: 'email_verified_at',
                    type: 'datetime',
                    isNullable: true,
                }),
                new TableColumn({
                    name: 'is_locked',
                    type: 'boolean',
                    default: true,
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', ['is_locked', 'email_verified_at']);
    }
}
