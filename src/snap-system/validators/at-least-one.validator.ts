import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'atLeastOne', async: true })
export class AtLeaseOneConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    if (!(value instanceof Array)) {
      return false;
    }
    return value.length > 0;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must have at least one value.`;
  }
}

export function AtLeaseOne(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'atLeastOne',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AtLeaseOneConstraint,
      constraints: [],
    });
  };
}
