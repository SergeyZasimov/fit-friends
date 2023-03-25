import { PersonalTrainingEntity } from '../personal-training.entity';
import { personalTrainingStubs } from './personal-training.stubs';

const { dto } = personalTrainingStubs;

describe('Personal Training Entity', () => {
  test('should return personal training entity', () => {
    const entity = new PersonalTrainingEntity(dto);

    expect(entity).toBeInstanceOf(PersonalTrainingEntity);
    expect(entity.status).toEqual(dto.status);
  });
});
