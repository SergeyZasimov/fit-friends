import { TokenPayload, User, UserRole, UserTokens } from '@fit-friends/shared';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { jwtConfig } from '../config/namespaces';
import { ProfileService } from '../profile/profile.service';
import { UserValidationMessage } from '../user/user.constant';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { AuthExceptionMessage } from './auth.constant';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  private staticFolder: string;
  private uploadFolder: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly config: ConfigService
  ) {
    this.staticFolder = this.config.get<string>('static.folder');
    this.uploadFolder = this.config.get<string>('multer.storage');
  }

  async register(
    dto: CreateUserDto,
    files?: {
      avatar: Express.Multer.File[];
      certificate: Express.Multer.File[];
    }
  ): Promise<User> {
    const avatar = files.avatar && files.avatar[0];
    const certificate = files.certificate && files.certificate[0];

    if (!files.avatar) {
      throw new BadRequestException(UserValidationMessage.AvatarRequired);
    }

    if (dto.role === UserRole.Trainer && !files.certificate) {
      await this.deleteFile(avatar);
      throw new BadRequestException(UserValidationMessage.CertificateRequired);
    }

    const existUser = await this.userRepository.findByEmail(dto.email);

    if (existUser) {
      await this.deleteFile(avatar);
      await this.deleteFile(certificate);
      throw new ConflictException(AuthExceptionMessage.ConflictUser(dto.email));
    }

    const user: User = {
      email: dto.email,
      role: dto.role,
    };
    const userEntity = await new UserEntity(user).setPassword(dto.password);

    const newUser = await this.userRepository.create(userEntity);

    const newProfile = await this.profileService.create(
      newUser,
      dto,
      avatar,
      certificate
    );
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

  private async deleteFile(file: Express.Multer.File) {
    await unlink(
      path.join(
        this.staticFolder,
        this.uploadFolder,
        file.fieldname,
        file.filename
      )
    );
  }
}
