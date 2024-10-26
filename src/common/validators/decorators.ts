import { registerDecorator, ValidationOptions } from 'class-validator';

import { isDateTime } from './helpers';

export const IsDateTime = (validationOptions?: ValidationOptions) => {
  return (o: object, propertyName: string) => {
    registerDecorator({
      name: 'isDateTime',
      target: o.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): Promise<boolean> | boolean {
          return isDateTime(value);
        },
      },
    });
  };
};
