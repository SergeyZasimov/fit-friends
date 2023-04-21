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
  ReviewStore: 'review',
  OrderStore: 'order',
  FriendsStore: 'friends',
  PersonalTrainingStore: 'personal-training',
  SportGymsStore: 'sport-gym',
  FoodDiaryStore: 'food-diary',
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
    FetchUsers: 'user/fetchUsers',
    FetchUserCard: 'user/fetchUserCard',
  },
  Notification: {
    Fetch: 'notification/fetch',
    Delete: 'notification/delete',
  },
  Workout: {
    Create: 'workout/create',
    FetchWorkouts: 'workout/fetchWorkouts',
    FetchWorkoutsInfo: 'workout/fetchWorkoutsInfo',
    FetchWorkout: 'workout/fetchWorkout',
    UpdateWorkout: 'workout/updateWorkout',
    DeleteVideo: 'workout/deleteVideo',
  },
  Review: {
    FetchReviews: 'review/fetchReviews',
    CreateReview: 'review/createReview',
  },
  Order: {
    FetchOrders: 'order/fetchOrders',
    FetchCustomersOrders: 'order/fetchCustomersOrders',
    CreateOrder: 'order/createOrder',
  },
  Friends: {
    FetchFriends: 'friends/fetchFriends',
    AddToFriends: 'friends/addToFriends',
    RemoveFromFriends: 'friends/removeFromFriends',
    CheckFriend: 'friends/checkFriend',
  },
  PersonalTraining: {
    Fetch: 'personal-trainings/fetch',
    UpdateStatus: 'personal-trainings/updateStatus',
    FetchMyRequests: 'personal-trainings/fetchMyRequests',
    Create: 'personal-training/create',
  },
  SportGyms: {
    FetchGym: 'sport-gyms/fetchGym',
    FetchGyms: 'sport-gyms/fetchGyms',
    FetchGymsInfo: 'sport-gyms/fetchGymsInfo',
    FetchFavorites: 'sport-gyms/fetchFavorites',
    UpdateFavoriteStatus: 'sport-gyms/updateFavoriteStatus',
  },
  FoodDiary: {
    Create: 'food-diary/create',
    FetchMany: 'food-diary/fetchMany',
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
  CustomerAccount: 'customer-account',
  CreateWorkout: 'create-workout',
  MyWorkouts: 'my-workouts',
  MyOrders: 'my-orders',
  MyFriends: 'my-friends',
  MyGyms: 'my-gyms',
  MyPurchase: 'my-purchase',
  CustomerWorkoutCatalog: 'workout-catalog',
  CustomerGymsCatalog: 'gyms-catalog',
  CustomerGymCard: 'gym-card',
  CustomerUsersCatalog: 'users-catalog',
  CustomerCardUser: 'user-card',
  CustomerCardTrainer: 'trainer-card',
  CustomerFoodDiary: 'food-diary',
  WorkoutCard: 'workout-card',
} as const;

export const CustomSelectField = {
  LocationField: 'Локация',
  GenderField: 'Пол',
  LevelField: 'Уровень',
  TrainingTime: 'Сколько времени потратим',
  TrainingType: 'Выберите тип тренировки',
} as const;
