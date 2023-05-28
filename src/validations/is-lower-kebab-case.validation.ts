import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isLowerCaseKebabCase', async: false })
export class IsLowerCaseKebabCaseConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    // Check if the string is all lowercase
    if (value !== value.toLowerCase()) {
      return false;
    }

    const regex = /^[a-z]+(-[a-z0-9]+)*$/;
    return regex.test(value);
  }

  defaultMessage(): string {
    return 'The property must be in kebab-case and all lowercase';
  }
}

export function IsLowerCaseKebabCase(validationOptions?: ValidationOptions) {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'isLowerCaseKebabCase',
      target: object.constructor,
      options: validationOptions,
      validator: IsLowerCaseKebabCaseConstraint,
    });
  };
}
