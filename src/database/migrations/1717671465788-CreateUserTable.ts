import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { editorColumns } from "../../snap-system/helpers/editor-migration";
import {UserStatusEnum} from "../../common/enum/user-status.enum";

export class CreateUserTable1717671465788 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'users',
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
                      name: 'first_name',
                      type: 'varchar',
                      length: '100',
                  },
                  {
                      name: 'last_name',
                      type: 'varchar',
                      length: '100',
                  },
                  {
                      name: 'avatar',
                      type: 'varchar',
                      length: '250',
                      isNullable:true
                  },
                  {
                      name: 'email',
                      type: 'varchar',
                      length: '50',
                  },
                  {
                      name: 'password',
                      type: 'varchar',
                      length: '250',
                  },
                  {
                      name: 'status',
                      type: 'tinyint',
                      unsigned: true,
                      default:UserStatusEnum.Active
                  },
                  {
                      name:'username',
                      type: 'varchar',
                      length: '50',
                      isNullable:true
                  },
                  {
                      name:'address',
                      type: 'varchar',
                      length:'250',
                      isNullable:true
                  },
                  {
                      name:'biography',
                      type: 'text',
                      isNullable:true
                  },
                  ...editorColumns,
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
