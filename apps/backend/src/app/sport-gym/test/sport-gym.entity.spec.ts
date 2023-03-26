import { SportGymEntity } from '../sport-gym.entity';
import { sportGymStubs } from './sport-gym.stubs';

const { dto } = sportGymStubs;

describe('Sport Gym Entity', () => {
  test('should return SportGymEntity', () => {
    const entity = new SportGymEntity(dto);

    expect(entity).toBeInstanceOf(SportGymEntity);
    expect(entity.description).toEqual(dto.description);
  });
});
