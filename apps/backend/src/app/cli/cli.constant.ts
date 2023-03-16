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
    WORKOUTS_COUNT: {
      MIN: 1,
      MAX: 5,
    },
    SPORT_GYM_COUNT: 5,
    ORDERS_COUNT: {
      MIN: 1,
      MAX: 5,
    },
  },
  SPORT_GYM: {
    PRICE: {
      MIN: 100,
      MAX: 5000,
    },
  },
} as const;
