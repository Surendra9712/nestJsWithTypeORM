import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityTarget } from 'typeorm';

@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity, columnName] = args.constraints;
    const found = await this.dataSource
      .createQueryBuilder()
      .from(entity, 'entity')
      .where({ [columnName]: value })
      .withDeleted()
      .getExists();

    return !found;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be unique`;
  }
}

export function IsUnique(
  entity: EntityTarget<any>,
  uniqueColumn: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, uniqueColumn],
      validator: IsUniqueConstraint,
    });
  };
}
