import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async getUser(id: number) {
    return this.userRepository.findById(id);
  }
}
