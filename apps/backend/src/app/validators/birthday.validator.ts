import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ name: 'BirthdayError', async: false })
export class BirthdayValidator implements ValidatorConstraintInterface {
  validate(date: string): boolean {
    return dayjs(date, 'YYYY-MM-DD', true).isValid();
  }
}
