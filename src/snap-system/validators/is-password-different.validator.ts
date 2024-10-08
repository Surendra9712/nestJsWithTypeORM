import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import {DataSource} from "typeorm";
import {UserEntity} from "@models/user/user.entity";
import {verifyHash} from "@snapSystem/helpers/helpers";

@ValidatorConstraint({async: false})
export class IsPasswordDifferentConstraint implements ValidatorConstraintInterface {
    constructor(private dataSource: DataSource) {
    }

    async validate(newPassword: string, args: ValidationArguments) {
        const email = (args.object as any).email;
        const userRepository = this.dataSource.getRepository(UserEntity);
        const user = await userRepository.findOne({where: {email}});
        if (!user) {
            return false;
        }
        return !(await verifyHash(newPassword, user.password));
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must not be the same as the old password`;
    }
}

export function IsPasswordDifferent(

    validationOptions?: ValidationOptions,
) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsPasswordDifferentConstraint,
        });
    };
}
