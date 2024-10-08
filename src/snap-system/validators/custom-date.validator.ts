import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customDate', async: false })
export class CustomDateConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage() {
    return 'Date should be in the format YYYY-MM-DD.';
  }
}

export function IsCustomDateString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCustomDateString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomDateConstraint,
    });
  };
}
