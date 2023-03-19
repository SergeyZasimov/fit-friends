import {
  CustomerProfile,
  FavoriteAction,
  Profile,
  TrainerProfile,
  User,
  UserRole,
} from '@fit-friends/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceWithFiles } from '../abstract/service-with-files';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { NotificationService } from '../notification/notification.service';
import { UserFiles, UserValidationMessage } from '../user/user.constant';
import { UserRepository } from '../user/user.repository';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { createFriendNotification } from './profile.constant';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService extends ServiceWithFiles {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService
  ) {
    super(configService);
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
    avatarFile?: Express.Multer.File,
    certificateFile?: Express.Multer.File
  ): Promise<Profile> {
    let profile: CustomerProfile | TrainerProfile;

    const avatar = avatarFile && this.setFilename(avatarFile);
    const certificate = certificateFile && this.setFilename(certificateFile);

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
        avatar: avatar && this.setFileUrl(avatar),
      };
    } else {
      profile = {
        name: dto.name,
        gender: dto.gender,
        location: dto.location,
        birthDay: dto.birthDay,
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        resume: dto.resume ?? '',
        isReadyToPersonalTraining: dto.isReadyToPersonalTraining ?? false,
        user: newUser.id,
        certificate: certificate && this.setFileUrl(certificate),
        avatar: avatar && this.setFileUrl(avatar),
      };
    }

    const profileEntity = new ProfileEntity({ ...profile });
    const newProfile = await this.profileRepository.create(profileEntity);

    if (avatar) {
      await this.writeUserFile(avatar);
    }

    if (certificate) {
      await this.writeUserFile(certificate);
    }

    return newProfile;
  }

  async update(
    userId: number,
    dto: UpdateProfileDto,
    files: UserFiles
  ): Promise<User> {
    const user = await this.getOne(userId);

    if (user.role === UserRole.Customer && files.certificate) {
      throw new BadRequestException(
        UserValidationMessage.CustomerNotUploadCertificate
      );
    }

    const avatar = files.avatar && this.setFilename(files.avatar[0]);
    const certificate =
      files.certificate && this.setFilename(files.certificate[0]);

    const currentAvatar = user.profile.avatar;
    const currentCertificate = user.profile.certificate;

    const profileEntity = new ProfileEntity({
      ...user.profile,
      ...dto,
      avatar: avatar && this.setFileUrl(avatar),
      certificate: certificate && this.setFileUrl(certificate),
    });
    await this.profileRepository.update(userId, profileEntity);

    if (avatar) {
      currentAvatar && (await this.deleteUserFile(currentAvatar));
      await this.writeUserFile(avatar);
    }

    if (certificate) {
      currentCertificate && (await this.deleteUserFile(currentCertificate));
      await this.writeUserFile(certificate);
    }

    return this.getOne(userId);
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    const user = await this.getOne(userId);
    await this.notificationService.create({
      userId: friendId,
      text: createFriendNotification(user.profile.name),
    });
    return this.userRepository.addFriend(userId, friendId);
  }

  async getFriends(userId: number, query: ProfileQueryDto) {
    return this.userRepository.findFriends(userId, query);
  }

  async updateFavoriteGym(userId: number, sportGymId: number) {
    const { sportGyms } = await this.userRepository.findFavoriteGyms(userId);

    const action = sportGyms.find((sportGym) => sportGym.id === sportGymId)
      ? FavoriteAction.Remove
      : FavoriteAction.Add;

    return this.userRepository.updateSportGymToFavorite(
      userId,
      sportGymId,
      action
    );
  }

  async getFavoriteGyms(userId: number) {
    const { sportGyms } = await this.userRepository.findFavoriteGyms(userId);
    return sportGyms;
  }
}
