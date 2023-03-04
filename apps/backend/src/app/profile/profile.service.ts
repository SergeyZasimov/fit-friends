import {
  CustomerProfile,
  Profile,
  TrainerProfile,
  User,
  UserRole,
} from '@fit-friends/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nanoid from 'nanoid';
import { constants } from 'node:fs';
import { access, mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { URL } from 'url';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserFiles, UserValidationMessage } from '../user/user.constant';
import { UserRepository } from '../user/user.repository';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  private host: string;
  private port: number;
  private staticFolder: string;
  private uploadFolder: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly configService: ConfigService
  ) {
    this.host = configService.get<string>('app.host');
    this.port = configService.get<number>('app.port');
    this.staticFolder = this.configService.get<string>('static.folder');
    this.uploadFolder = this.configService.get<string>('static.upload');
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
        resume: dto.resume,
        isReadyToPersonalTraining: dto.isReadyToPersonalTraining,
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
      await this.deleteUserFile(currentAvatar);
      await this.writeUserFile(avatar);
    }

    if (certificate) {
      await this.deleteUserFile(currentCertificate);
      await this.writeUserFile(certificate);
    }

    return this.getOne(userId);
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    return this.userRepository.addFriend(userId, friendId);
  }

  async getFriends(userId: number) {
    return this.userRepository.findFriends(userId);
  }

  private setFileUrl(file: Express.Multer.File) {
    return new URL(
      `http://${this.host}:${this.port}/${this.uploadFolder}/${file.fieldname}/${file.filename}`
    ).href;
  }

  private setFilename(file: Express.Multer.File): Express.Multer.File {
    const filename = nanoid();
    const ext = path.extname(file.originalname);
    file.filename = `${filename}${ext}`;
    return file;
  }

  private async checkFolderExist(file: Express.Multer.File): Promise<string> {
    const folderPath = path.resolve(
      this.staticFolder,
      this.uploadFolder,
      file.fieldname
    );
    await access(folderPath, constants.F_OK).catch(async () => {
      await mkdir(folderPath, { recursive: true });
    });
    return folderPath;
  }

  private async writeUserFile(file: Express.Multer.File): Promise<void> {
    const folderPath = await this.checkFolderExist(file);
    const filePath = path.join(folderPath, file.filename);
    await writeFile(filePath, file.buffer);
  }

  private async deleteUserFile(url: string): Promise<void> {
    const filePath = path.resolve(
      this.staticFolder,
      ...url.split('/').slice(-3)
    );
    await unlink(filePath);
  }
}
