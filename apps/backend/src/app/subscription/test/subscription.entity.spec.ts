import { SubscriptionEntity } from '../subscription.entity';
import { dto } from './subscription.stubs';

describe('Subscription Entity', () => {
  test('should return subscription entity', () => {
    const entity = new SubscriptionEntity(dto);

    expect(entity).toBeInstanceOf(SubscriptionEntity);
    expect(entity.trainerId).toEqual(dto.trainerId);
  });
});
