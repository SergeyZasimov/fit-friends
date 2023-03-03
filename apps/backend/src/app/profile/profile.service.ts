import {
  CustomerProfile,
  Profile,
  TrainerProfile,
  User,
  UserRole,
} from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { URL } from 'url';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  private host: string;
  private port: number;
  private uploadFolder: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly configService: ConfigService
  ) {
    this.host = configService.get<string>('app.host');
    this.port = configService.get<number>('app.port');
    this.uploadFolder = configService.get<string>('multer.storage');
  }

  async getOne(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async getMany(query: ProfileQueryDto): Promise<User[]> {
    return this.userRepository.find(query);
  }

  async create(
    newUser: User,
    dto: CreateUserDto,
    file?: Express.Multer.File
  ): Promise<Profile> {
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

    const avatar = file && this.setAvatar(file);
    const profileEntity = new ProfileEntity({ ...profile, avatar });
    return await this.profileRepository.create(profileEntity);
  }

  async update(
    userId: number,
    dto: UpdateProfileDto,
    file: Express.Multer.File
  ): Promise<User> {
    const user = await this.getOne(userId);
    const avatar = file ? this.setAvatar(file) : user.profile.avatar;
    const profileEntity = new ProfileEntity({
      ...user.profile,
      ...dto,
      avatar,
    });
    await this.profileRepository.update(userId, profileEntity);
    return this.getOne(userId);
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    return this.userRepository.addFriend(userId, friendId);
  }

  async getFriends(userId: number) {
    return this.userRepository.findFriends(userId);
  }

  private setAvatar(file: Express.Multer.File) {
    return new URL(
      `http://${this.host}:${this.port}/${this.uploadFolder}/${file.fieldname}/${file.filename}`
    ).href;
  }
}
