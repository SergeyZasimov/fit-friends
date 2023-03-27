import { ReviewEntity } from '../review.entity';
import { dto, userId } from './review.stubs';

describe('Review Entity', () => {
  test('should return Review Entity', () => {
    const entity = new ReviewEntity({ ...dto, userId });

    expect(entity).toBeInstanceOf(ReviewEntity);
    expect(entity.text).toEqual(dto.text);
  });
});
