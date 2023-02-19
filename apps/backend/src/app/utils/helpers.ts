import { ClassConstructor, plainToInstance } from 'class-transformer';

export const formatEnumToValidationMessage = (obj: object) => {
  return Object.values(obj).join(', ');
};

export const fillObject = <T, V>(
  dto: ClassConstructor<T>,
  plainObject: V,
  role?: string
): T => {
  return plainToInstance(dto, plainObject, {
    excludeExtraneousValues: true,
    groups: [role],
  });
};
