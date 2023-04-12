export const BACKEND_URL = 'http://localhost:3333/api';
export const REQUEST_TIMEOUT = 5000;
export const ACCESS_TOKEN_KEY_NAME = 'fit-fiends-access-token';
export const REFRESH_TOKEN_KEY_NAME = 'fit-fiends-refresh-token';
export const DEFAULT_PRICE_CHANGE_TIMEOUT = 500;

export const LOW_INDEX = 0;
export const HIGH_INDEX = 1;

export const DEFAULT_RATING = {
  MIN: 0,
  MAX: 5,
};

export const StoreNamespace = {
  UserStore: 'user',
  NotificationStore: 'notification',
  WorkoutStore: 'workout',
} as const;

export const ActionName = {
  User: {
    Register: 'user/register',
    QuestionnaireCustomer: 'user/questionnaire/customer',
    QuestionnaireTrainer: 'user/questionnaire/trainer',
    Login: 'user/login',
    FetchUser: 'user/fetchUser',
    UpdateUser: 'user/updateUser',
    DeleteCertificate: 'user/deleteCertificate',
    DeleteAvatar: 'user/deleteAvatar',
  },
  Notification: {
    Fetch: 'notification/fetch',
    Delete: 'notification/delete',
  },
  Workout: {
    Create: 'workout/create',
    FetchWorkouts: 'workout/fetchWorkout',
    FetchWorkoutsInfo: 'workout/fetchWorkoutsInfo',
  },
} as const;

export const RequestStatus = {
  Unknown: 'Unknown',
  Process: 'Process',
  Success: 'Success',
  Fail: 'Fail',
} as const;

export const AppRoute = {
  Root: '/',
  SignUp: 'sign-up',
  SignIn: 'sign-in',
  QuestionnaireCustomer: 'questionnaire-customer',
  QuestionnaireTrainer: 'questionnaire-trainer',
  CustomerMain: 'customer-main',
  TrainerAccount: 'trainer-account',
  CreateWorkout: 'create-workout',
  MyWorkouts: 'my-workouts',
} as const;

export const CustomSelectField = {
  LocationField: 'Локация',
  GenderField: 'Пол',
  LevelField: 'Уровень',
  TrainingTime: 'Сколько времени потратим',
  TrainingType: 'Выберите тип тренировки',
} as const;
