import { ProfileQuery, User } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async getOne(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async getMany(query: ProfileQuery): Promise<User[]> {
    return this.userRepository.find(query);
  }

  async update(userId: number, dto: UpdateProfileDto): Promise<User> {
    const user = await this.getOne(userId);
    const profileEntity = new ProfileEntity({ ...user.profile, ...dto });
    await this.profileRepository.update(userId, profileEntity);
    return this.getOne(userId);
  }
}
