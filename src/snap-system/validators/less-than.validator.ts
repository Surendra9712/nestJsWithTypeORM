import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNullOrUndefined } from '@snapSystem/helpers/helpers';

@ValidatorConstraint({ name: 'isLessThan', async: true })
export class IsLessThanConstraint implements ValidatorConstraintInterface {
  validate(value: any, args?: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];

    if (isNullOrUndefined(relatedValue)) {
      return true;
    }
    return value < relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} must be less than ${relatedPropertyName}`;
  }
}

export function IsLessThan(
  relatedPropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isLessThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsLessThanConstraint,
      constraints: [relatedPropertyName],
    });
  };
}
