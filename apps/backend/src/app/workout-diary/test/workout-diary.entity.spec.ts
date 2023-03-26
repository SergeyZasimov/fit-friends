import { WorkoutDiaryEntity } from '../workout-diary.entity';
import { workoutDiaryStubs } from './workout-diary.stubs';

const { dto } = workoutDiaryStubs;

describe('Workout Diary Entity', () => {
  test('should return WorkoutDiaryEntity', () => {
    const entity = new WorkoutDiaryEntity(dto);

    expect(entity).toBeInstanceOf(WorkoutDiaryEntity);
    expect(entity.lostCaloriesAmount).toEqual(dto.lostCaloriesAmount);
  });
});
