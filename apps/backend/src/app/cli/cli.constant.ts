export const MOCKS_DEFAULT = {
  USER: {
    PASSWORD: 'secret',
    TRAINING_TYPE_COUNT: {
      MIN: 1,
      MAX: 3,
    },
  },
  ORDER: {
    AMOUNT: {
      MAX: 10,
    },
  },
  WORKOUT: {
    PRICE: {
      MAX: 1000,
    },
  },
  GENERATE: {
    USER_COUNT: 5,
    FRIENDS_ROUNDS: 10,
    FRIENDS_COUNT: 3,
    PERSONAL_TRAINING_ROUNDS: 10,
    PERSONAL_TRAINING_COUNT: 5,
    WORKOUTS_COUNT: {
      MIN: 1,
      MAX: 5,
    },
    SPORT_GYM_COUNT: 5,
    ORDERS_COUNT: {
      MIN: 1,
      MAX: 5,
    },
    REVIEW_COUNT: 3,
    FOOD_DIARY_COUNT: 7,
    WORKOUT_DIARY_COUNT: 2,
  },
  SPORT_GYM: {
    PRICE: {
      MIN: 100,
      MAX: 5000,
    },
  },
  FOOD_DIARY: {
    CALORIES_AMOUNT: {
      MIN: 100,
      MAX: 900,
    },
    RECENT_DAYS: 7,
  },
  WORKOUT_DIARY: {
    LOST_CALORIES_AMOUNT: {
      MIN: 100,
      MAX: 900,
    },
    LOST_TRAINING_TIME: {
      MIN: 10,
      MAX: 60,
    },
  },
} as const;
