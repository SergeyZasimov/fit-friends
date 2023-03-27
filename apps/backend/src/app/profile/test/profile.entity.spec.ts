import { ProfileEntity } from '../profile.entity';
import { dto } from './profile.stubs';

describe('Profile Entity', () => {
  test('should return profile entity', () => {
    const entity = new ProfileEntity(dto);

    expect(entity).toBeInstanceOf(ProfileEntity);
    expect(entity.name).toEqual(dto.name);
  });
});
