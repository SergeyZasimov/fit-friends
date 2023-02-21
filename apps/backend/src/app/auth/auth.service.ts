import {
  CustomerProfile,
  TokenPayload,
  TrainerProfile,
  User,
  UserRole,
  UserTokens,
} from '@fit-friends/shared';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '../config/namespaces';
import { ProfileEntity } from '../profile/profile.entity';
import { ProfileRepository } from '../profile/profile.repository';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthExceptionMessage } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  async register(dto: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthExceptionMessage.ConflictUser(dto.email));
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
    return { ...newUser, profile: newProfile };
  }

  async login(user: User): Promise<UserTokens> {
    const { id, email, role } = user;

    const payload: TokenPayload = {
      id,
      email,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtOptions.refreshTokenSecret,
      expiresIn: this.jwtOptions.refreshTokenExpiresIn,
    });

    const userEntity = new UserEntity({ ...user, refreshToken });
    await this.userRepository.update(id, userEntity);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async verify(email: string, password: string): Promise<User> {
    const existUser = await this.checkUserExist(email);
    const isVerify = await new UserEntity(existUser).comparePassword(password);

    if (!isVerify) {
      throw new UnauthorizedException(AuthExceptionMessage.ForeignPassword);
    }

    return existUser;
  }

  async logout(user: User): Promise<void> {
    const userEntity = new UserEntity({ ...user, refreshToken: null });
    await this.userRepository.update(user.id, userEntity);
  }

  async checkUserExist(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AuthExceptionMessage.UserNotFound(email));
    }

    return user;
  }
}
