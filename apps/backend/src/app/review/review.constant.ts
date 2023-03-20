export const REVIEW_CONSTRAINT = {
  RATING: {
    MIN: 1,
    MAX: 5,
  },
  TEXT: {
    MIN: 100,
    MAX: 1024,
  },
};

export const ReviewValidationMessage = {
  WorkoutIdNotValid: 'Неверный ID тренировки',
  RatingNotValid: `Рейтинг должен быть в диапазоне между ${REVIEW_CONSTRAINT.RATING.MIN} и ${REVIEW_CONSTRAINT.RATING.MAX}`,
  TextLengthNotValid: `Текст отзыва должен быть строкой длиной от ${REVIEW_CONSTRAINT.TEXT.MIN} до ${REVIEW_CONSTRAINT.TEXT.MAX}`,
};
