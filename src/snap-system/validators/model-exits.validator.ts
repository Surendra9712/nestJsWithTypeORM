import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget } from 'typeorm';

@ValidatorConstraint({ name: 'IsModelIdExists', async: true })
export class ModelIdExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(id: number, args: ValidationArguments): Promise<boolean> {
    const entity: EntityTarget<any> = args.constraints[0] as EntityTarget<any>;
    return await this.dataSource
      .createQueryBuilder()
      .from(entity, 'entity')
      .where('entity.id = :entityId', { entityId: id })
      .andWhere('deleted_at is null')
      .getExists();
  }

  defaultMessage(): string {
    return `Entity with this id does not exist`;
  }
}

export function IsModelIdExists(
  entity: EntityTarget<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsModelIdExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: ModelIdExistsRule,
    });
  };
}
