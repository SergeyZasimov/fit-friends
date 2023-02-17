export const Gender = {
  Male: 'мужской ',
  Female: 'женский',
  Unknown: 'неважно',
} as const;

export const Role = {
  Customer: 'пользователь',
  Trainer: 'тренер',
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

export const GymParameters = [
  'бассейн',
  'бесплатная парковка',
  'детская комната',
  'массаж',
] as const;

export const Purchases = ['абонемент', 'тренировка'] as const;

export const PaymentMethods = ['visa', 'mir', 'umoney'] as const;

export const TrainingStatus = {
  UnderConsideration: 'на рассмотрении',
  Canceled: 'отклонён',
  Accept: 'принят',
} as const;
