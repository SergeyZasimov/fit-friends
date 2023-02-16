export const Gender = {
  Male: 'Male',
  Female: 'Female',
  Unknown: 'Unknown',
} as const;

export const Role = {
  Customer: 'Customer',
  Trainer: 'Trainer',
} as const;

export const Locations = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

export const TrainingLevels = ['новичок', 'любитель', 'профессионал'] as const;

export const TrainingTypes = [
  'йога',
  'бег',
  'бокс',
  'стрейчинг',
  'кроссфит',
  'аэробика',
  'пилатес',
] as const;

export const TrainingTimes = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  'больше 80 мин',
] as const;

export const FavorGenders = ['для женщин', 'для мужчин', 'для всех'] as const;
