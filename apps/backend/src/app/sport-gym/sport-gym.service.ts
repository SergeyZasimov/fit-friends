import { CreateSportGym, SportGym } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { QuerySportGymDto } from './dto/query-sport-gym.dto';
import { SPORT_GYM_PHOTOS_FOLDER } from './sport-gym.constant';
import { SportGymEntity } from './sport-gym.entity';
import { SportGymRepository } from './sport-gym.repository';

@Injectable()
export class SportGymService {
  protected host: string;
  protected port: number;
  private staticFolder: string;

  constructor(
    private readonly sportGymRepository: SportGymRepository,
    private readonly config: ConfigService
  ) {
    this.host = config.get<string>('app.host');
    this.port = config.get<number>('app.port');
    this.staticFolder = config.get<string>('static.folder');
  }

  async create(data: CreateSportGym): Promise<SportGym> {
    const sportGymEntity = new SportGymEntity({
      ...data,
      photos: await this.setPhotos(),
    });
    return this.sportGymRepository.create(sportGymEntity);
  }

  async getOne(id: number): Promise<SportGym> {
    return this.sportGymRepository.findOne(id);
  }

  async getMany(query: QuerySportGymDto): Promise<SportGym[]> {
    return this.sportGymRepository.findMany(query);
  }

  private async setPhotos(): Promise<string[]> {
    const photos = await readdir(
      path.resolve(this.staticFolder, SPORT_GYM_PHOTOS_FOLDER)
    );

    return photos.map(
      (photo) =>
        new URL(
          `http://${this.host}:${this.port}/${SPORT_GYM_PHOTOS_FOLDER}/${photo}`
        ).href
    );
  }
}
