export const UrlDomain = {
  Auth: 'auth',
  Profile: 'profile',
  Workout: 'workout',
  Order: 'order',
  FoodDiary: 'food-diary',
  WorkoutDiary: 'workout-diary',
  Subscription: 'subscription',
  Notification: 'notification',
  PersonalTraining: 'personal-training',
  SportGym: 'sport-gym',
  Review: 'review',
} as const;

export const UrlRoute = {
  Register: 'register',
  QuestionnaireCustomer: 'questionnaire-customer',
  QuestionnaireTrainer: 'questionnaire-trainer',
  Login: 'login',
  Logout: 'logout',
  Refresh: 'refresh',
  UploadAvatar: 'upload-avatar',
  DeleteCertificate: 'delete-certificate',
  DeleteAvatar: 'delete-avatar',
  Friends: 'friends',
  AddFriend: 'add-friend',
  RemoveFriend: 'remove-friend',
  CheckFriend: 'check-friend',
  Trainer: 'trainer',
  Customer: 'customer',
  UpdateFavoriteGym: 'favorite-gym',
  Info: 'info',
  CheckSubscription: 'check-subscription',
} as const;

export const UrlParams = {
  Id: 'id',
} as const;
