import { createFriendNotification } from '../notification.constant';

const id = 1;
const userId = 1;

const userName = 'John';

const dto = {
  userId,
  text: createFriendNotification(userName),
};

const notification = {
  ...dto,
  userId,
  id,
};

export const notificationStubs = { dto, id, userId, userName, notification };
