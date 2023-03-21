import { ClassConstructor, plainToInstance } from 'class-transformer';

export const formatEnumToValidationMessage = (obj: object) => {
  return Object.values(obj).join(', ');
};

export const fillObject = <T, V>(
  dto: ClassConstructor<T>,
  plainObject: V,
  group?: string
): T | T[] => {
  const options = group
    ? {
        excludeExtraneousValues: true,
        groups: [group],
      }
    : {
        excludeExtraneousValues: true,
      };

  return plainToInstance(dto, plainObject, options);
};
