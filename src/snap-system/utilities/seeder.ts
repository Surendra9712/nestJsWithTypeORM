import { appDataSource } from 'src/config/typeorm-cli.config';
import { runSeeders } from 'typeorm-extension';
import process from 'process';
import { DatabaseSeeder } from '../../database/seeders/database.seeder';

appDataSource.initialize().then(async () => {
  // await appDataSource.synchronize(true);
  await runSeeders(appDataSource, {
    //additional config for seeding
    //TODO : currently auto seeding call isn't working so for now adding the object here will work,
    // once the error is resolve then path approach will be implemented
    // also env variable will be added instead of adding new modules path
    // factories: ['src/database/factories/*{.ts,.js}'],
    // seeds: [src/database/seeder/*{.ts,.js}'],
    factories: ['./src/database/factories/*.factory.ts'],
    seeds: [DatabaseSeeder],
  });
  process.exit();
});
