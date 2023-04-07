export const BACKEND_URL = 'http://localhost:3333/api';
export const REQUEST_TIMEOUT = 5000;

export const StoreNamespace = {
  UserStore: 'user',
} as const;

export const ActionName = {
  User: {
    Register: 'user/register',
    QuestionnaireCustomer: 'user/questionnaire/customer',
    QuestionnaireTrainer: 'user/questionnaire/trainer',
  },
} as const;

export const RequestStatus = {
  Unknown: 'Unknown',
  Process: 'Process',
  Success: 'Success',
  Fail: 'Fail',
} as const;
