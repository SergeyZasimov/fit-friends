import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { MOCKS_DEFAULT } from '../../cli/cli.constant';
import { createCustomer } from '../../cli/mocks';
import { UserEntity } from '../user.entity';

describe('User Entity', () => {
  let dto: CreateUserDto;
  let entity: UserEntity;

  beforeEach(() => {
    dto = createCustomer();
    entity = new UserEntity(dto);

    jest.clearAllMocks();
  });

  test('should create user entity', () => {
    expect(entity).toBeInstanceOf(UserEntity);
    expect(entity.email).toEqual(dto.email);
  });

  test('should set password hash', async () => {
    const newEntity = await entity.setPassword(dto.password);
    expect(
      await newEntity.comparePassword(MOCKS_DEFAULT.USER.PASSWORD)
    ).toBeTruthy();
  });
});
