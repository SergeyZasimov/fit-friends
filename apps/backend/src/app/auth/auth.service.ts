import {
  CustomerProfile,
  TrainerProfile,
  User,
  UserRole,
} from '@fit-friends/shared';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileEntity } from '../profile/profile.entity';
import { ProfileRepository } from '../profile/profile.repository';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async register(dto: CreateUserDto) {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      // TODO: message
      throw new ConflictException();
    }

    const user: User = {
      email: dto.email,
      role: dto.role,
    };
    const userEntity = await new UserEntity(user).setPassword(dto.password);

    const newUser = await this.userRepository.create(userEntity);

    let profile: CustomerProfile | TrainerProfile;

    if (newUser.role === UserRole.Customer) {
      profile = {
        name: dto.name,
        gender: dto.gender,
        location: dto.location,
        birthDay: dto.birthDay,
        caloriesAmountToLose: dto.caloriesAmountToLose,
        caloriesAmountToLosePerDay: dto.caloriesAmountToLosePerDay,
        isReadyToTraining: dto.isReadyToTraining,
        trainingLevel: dto.trainingLevel,
        trainingTime: dto.trainingTime,
        trainingType: dto.trainingType,
        user: newUser.id,
      };
    } else {
      profile = {
        name: dto.name,
        gender: dto.gender,
        location: dto.location,
        birthDay: dto.birthDay,
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        resume: dto.resume,
        isReadyToPersonalTraining: dto.isReadyToPersonalTraining,
        user: newUser.id,
      };
    }

    const profileEntity = new ProfileEntity(profile);
    const newProfile = await this.profileRepository.create(profileEntity);
    return { ...newUser, ...newProfile };
  }

  async login(user: User) {
    const { id, email, role } = user;
    console.log(id, email, role);
  }

  async verify(email: string, password: string): Promise<User> {
    const existUser = await this.checkUserExist(email);
    const isVerify = await new UserEntity(existUser).comparePassword(password);

    if (!isVerify) {
      throw new ForbiddenException();
    }

    return existUser;
  }

  private async checkUserExist(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
