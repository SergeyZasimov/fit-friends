export const BACKEND_URL = 'http://localhost:3333/api';
export const REQUEST_TIMEOUT = 5000;
export const ACCESS_TOKEN_KEY_NAME = 'fit-fiends-access-token';
export const REFRESH_TOKEN_KEY_NAME = 'fit-fiends-refresh-token';

export const StoreNamespace = {
  UserStore: 'user',
} as const;

export const ActionName = {
  User: {
    Register: 'user/register',
    QuestionnaireCustomer: 'user/questionnaire/customer',
    QuestionnaireTrainer: 'user/questionnaire/trainer',
    Login: 'user/login',
    FetchUser: 'user/fetchUser',
    UpdateUser: 'user/updateUser',
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
} as const;

export const CustomSelectField = {
  LocationField: 'Локация',
  GenderField: 'Пол',
  LevelField: 'Уровень',
} as const;
