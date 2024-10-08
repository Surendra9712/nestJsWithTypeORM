import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export class DatabaseSeeder implements Seeder {
  public async run(
    datasource: DataSource,
    factoryManger: SeederFactoryManager,
  ): Promise<any> {
  }
}
