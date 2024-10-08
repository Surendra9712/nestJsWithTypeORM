import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customDate', async: false })
export class IsValidHexColorConstraint implements ValidatorConstraintInterface {
  validate(colorCode: string, args: ValidationArguments) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid hex color code';
  }
}

export function IsValidHexColor(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidHexColor',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidHexColorConstraint,
    });
  };
}
