import {
  FavoriteAction,
  Profile,
  QuerySportGym,
  User,
  UserRole,
} from '@fit-friends/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceWithFiles } from '../abstract/service-with-files';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { createFriendNotification } from '../notification/notification.constant';
import { NotificationService } from '../notification/notification.service';
import { SportGymService } from '../sport-gym/sport-gym.service';
import { UserFiles, UserValidationMessage } from '../user/user.constant';
import { UserRepository } from '../user/user.repository';
import { DeleteCertificateDto } from './dto/delete-certificate.rdo';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService extends ServiceWithFiles {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly configService: ConfigService,
    private readonly notificationService: NotificationService,
    private readonly sportGymService: SportGymService
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
    dto: RegisterUserDto,
    avatarFile?: Express.Multer.File
  ): Promise<Profile> {
    const avatar = avatarFile && this.setFilename(avatarFile);

    const profile = {
      name: dto.name,
      gender: dto.gender,
      location: dto.location,
      birthDay: dto.birthDay,
      user: newUser.id,
      avatar: avatar && this.setFileUrl(avatar),
    };

    const profileEntity = new ProfileEntity({ ...profile });
    const newProfile = await this.profileRepository.create(profileEntity);

    if (avatar) {
      await this.writeUserFile(avatar);
    }

    return newProfile;
  }

  async update(
    userId: number,
    dto: UpdateProfileDto,
    files?: UserFiles
  ): Promise<User> {
    const user = await this.getOne(userId);

    if (user.role === UserRole.Customer && files && files.certificate) {
      throw new BadRequestException(
        UserValidationMessage.CustomerNotUploadCertificate
      );
    }

    const avatar = files && files.avatar && this.setFilename(files.avatar[0]);
    const certificate =
      files && files.certificate && this.setFilename(files.certificate[0]);

    const currentAvatar = user.profile.avatar;
    const currentCertificates = user.profile.certificates;

    const profileEntity = new ProfileEntity({
      ...user.profile,
      ...dto,
      avatar: avatar ? this.setFileUrl(avatar) : currentAvatar,
      certificates: certificate
        ? [...currentCertificates, this.setFileUrl(certificate)]
        : currentCertificates,
    });

    await this.profileRepository.update(userId, profileEntity);

    if (avatar) {
      currentAvatar && (await this.deleteUserFile(currentAvatar as string));
      await this.writeUserFile(avatar);
    }

    if (certificate) {
      await this.writeUserFile(certificate);
    }

    return this.getOne(userId);
  }

  async addFriend(userId: number, friendId: number): Promise<void> {
    const user = await this.getOne(userId);
    await this.notificationService.create({
      userId: friendId,
      text: createFriendNotification(user.profile.name),
    });
    await this.userRepository.addFriend(userId, friendId);
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    const user = await this.getOne(userId);
    await this.notificationService.create({
      userId: friendId,
      text: createFriendNotification(user.profile.name),
    });
    await this.userRepository.removeFriend(userId, friendId);
  }

  async getFriends(userId: number, query: ProfileQueryDto) {
    return this.userRepository.findFriends(userId, query);
  }

  async checkFriend(
    userId: number,
    friendId: number
  ): Promise<User | undefined> {
    const friends = await this.userRepository.findFriends(userId);
    return friends.find((user) => user.id === friendId);
  }

  async updateFavoriteGym(userId: number, sportGymId: number) {
    await this.sportGymService.checkExist(sportGymId);
    const sportGyms = await this.userRepository.findFavoriteGyms(userId);

    const action = sportGyms.find((sportGym) => sportGym.id === sportGymId)
      ? FavoriteAction.Remove
      : FavoriteAction.Add;

    return this.userRepository.updateSportGymToFavorite(
      userId,
      sportGymId,
      action
    );
  }

  async getFavoriteGyms(userId: number, query: QuerySportGym) {
    return this.userRepository.findFavoriteGyms(userId, query);
  }

  async deleteCertificate(userId: number, dto: DeleteCertificateDto) {
    const { certificate } = dto;
    const user = await this.getOne(userId);

    const currentCertificates = user.profile.certificates;

    const updatedCertificates = currentCertificates.filter(
      (item) => item !== certificate
    );

    const profileEntity = new ProfileEntity({
      ...user.profile,
      certificates: updatedCertificates,
    });

    await this.profileRepository.update(userId, profileEntity);

    await this.deleteUserFile(certificate);

    return this.getOne(userId);
  }

  async deleteAvatar(userId: number) {
    const user = await this.getOne(userId);

    const currentAvatar = user.profile.avatar;

    const profileEntity = new ProfileEntity({
      ...user.profile,
      avatar: null,
    });

    await this.profileRepository.update(userId, profileEntity);

    currentAvatar && (await this.deleteUserFile(currentAvatar as string));

    return this.getOne(userId);
  }
}
