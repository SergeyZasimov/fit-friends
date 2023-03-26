import { WorkoutEntity } from '../workout.entity';
import { workoutStubs } from './workout.stubs';

const { dto } = workoutStubs;

describe('Workout Entity', () => {
  test('should return workout entity', () => {
    const entity = new WorkoutEntity(dto);

    expect(entity).toBeInstanceOf(WorkoutEntity);
    expect(entity.title).toEqual(dto.title);
  });
});
