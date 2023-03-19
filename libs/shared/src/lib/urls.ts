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
} as const;

export const UrlRoute = {
  Register: 'register',
  Login: 'login',
  Logout: 'logout',
  Refresh: 'refresh',
  UploadAvatar: 'upload-avatar',
  Friends: 'friends',
  AddFriend: 'add-friend',
  Trainer: 'trainer',
  Customer: 'customer',
  UpdateFavoriteGym: 'update-favorite-gym',
} as const;

export const UrlParams = {
  Id: 'id',
} as const;
