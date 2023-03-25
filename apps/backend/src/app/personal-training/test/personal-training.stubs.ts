import { TrainingStatus } from '@fit-friends/shared';
import { userStubs } from '../../user/test/user.stub';

const id = 1;
const userId = 1;
const anotherUserId = 2;
const newStatus = TrainingStatus.Accept;

const { user } = userStubs;

const dto = {
  requesterId: userId,
  conductorId: anotherUserId,
  status: TrainingStatus.UnderConsideration,
};

const personalTraining = {
  id,
  ...dto,
  requester: user,
};

const updatedPersonalTraining = {
  ...personalTraining,
  status: newStatus,
};

export const personalTrainingStubs = {
  dto,
  personalTraining,
  id,
  userId,
  updatedPersonalTraining,
  newStatus,
  anotherUserId,
};
